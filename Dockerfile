FROM node:10-alpine AS build
COPY . /src
WORKDIR /src
RUN npm ci
RUN npm run eslint
RUN npm run build
RUN npm run test
# Remove extraneous packages
RUN npm prune --production

# Release image
FROM node:10-alpine
USER node
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}
WORKDIR /usr/src/service
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist dist
CMD ["node", "./dist/index.js"]
