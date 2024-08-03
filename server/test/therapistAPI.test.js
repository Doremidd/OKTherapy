const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Therapist = require('../models/therapistModel');
const therapistsRouter = require('../routes/therapists');

const app = express();
app.use(express.json());
app.use('/therapists', therapistsRouter);

jest.mock('../models/therapistModel');

describe('GET /therapists', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return all therapists with Get', async () => {
    const mockTherapists = [
      { name: 'abc', gender: 'female',onlineAvailability:'Yes'},
      { name: 'def', location: 'vancouver',description:'hahaha' }
    ];

    Therapist.find.mockResolvedValue(mockTherapists);

    const response = await request(app).get('/therapists');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTherapists);

  });

  it('should return a therapist by ID', async () => {
    const mockTherapist = {
      _id: '1234567',
      name: 'Jane Doe',
      gender: 'female',
      location: 'Vancouver',
      description: 'hahaha',
      onlineAvailability: 'Yes'
    };

    Therapist.findById.mockResolvedValue(mockTherapist);

    const response = await request(app).get(`/therapists/${mockTherapist._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTherapist);
  });


  it('should handle errors ', async () => {
    Therapist.find.mockRejectedValue(new Error('Network error'));
    const response = await request(app).get('/therapists');
    expect(response.status).toBe(500);
  });
});