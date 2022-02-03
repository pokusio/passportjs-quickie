const express = require('express')

const path = require('path');
// const pokus_environment = require("../../environment/")

/****
 * Add to your index.js / server.js :
 *  const myApiEndpoint = require("./${join(__dirname, '')}/")
 */
const routerJsFilePath = path.join(__dirname, 'index.js');
const postRouter = async (request, response) => {
   response.status(500)
   response.json({
     error: 'Un implemented Express JS Router',
     message: `The ${routerJsFilePath} Express JS Router is not implemented yet`
   })
}

const getRouter = async (request, response) => {
   response.status(500)
   response.json({
     error: 'Un implemented Express JS Router',
     message: `The ${routerJsFilePath} Express JS Router is not implemented yet`
   })
}

const updateRouter = async (request, response) => {
   response.status(500)
   response.json({
     error: 'Un implemented Express JS Router',
     message: `The ${routerJsFilePath} Express JS Router is not implemented yet`
   })
}

const deleteRouter = async (request, response) => {
   response.status(500)
   response.json({
     error: 'Un implemented Express JS Router',
     message: `The ${routerJsFilePath} Express JS Router is not implemented yet`
   })
}

const getApiRouter = () => {
  return {
      get: getRouter,
      post: postRouter,
      update: updateRouter,
      delete: deleteRouter
  }
}

module.exports = {
    getRouter: getRouter,
    postRouter: postRouter,
    updateRouter: updateRouter,
    deleteRouter: deleteRouter
};
