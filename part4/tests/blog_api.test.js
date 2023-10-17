const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog has 4 likes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].content).toBe(4)
})

afterAll(async () => {
  await mongoose.connection.close()
})