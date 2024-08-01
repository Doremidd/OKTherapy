const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const usersRouter = require('../routes/users');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

jest.mock('../models/userModel');

describe('API test for users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return a user by userName', async () => {
    const mockUser = {
      userName: '1234567',
      firstName: 'Tony',
      lastName: 'Smith',
      age: '20',
      gender: 'male',
      sexuality: 'Gay',
      location: 'vancouver',
      budget: '200',
      therapyMode: 'Online',
      therapistGender: 'female',
      therapyFocus: 'Anxiety/Panic Attacks',
      therapyMethods: ['Cognitive Behavioural Therapy (CBT)'],
      certification: 'ATR: Registered Art Therapist',
      matchedTherapists: []
    };

    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app).get(`/users/${mockUser.userName}`);

    expect(response.status).toBe(200);
    expect(response.body.profile).toEqual({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      age: mockUser.age,
      gender: mockUser.gender,
      sexuality: mockUser.sexuality,
      location: mockUser.location,
      budget: mockUser.budget,
      therapyMode: mockUser.therapyMode,
      therapistGender: mockUser.therapistGender,
      therapyFocus: mockUser.therapyFocus,
      therapyMethods: mockUser.therapyMethods,
      certification: mockUser.certification,
    });
  });

  it('should create a new user', async () => {
    const mockUser = {
      userName: '1234567',
      firstName: 'Tony',
      lastName: 'Smith',
      age: '20',
      gender: 'male',
      sexuality: 'Gay',
      location: 'vancouver',
      budget: '200',
      therapyMode: 'Online',
      therapistGender: 'female',
      therapyFocus: 'Anxiety/Panic Attacks',
      therapyMethods: ['Cognitive Behavioural Therapy (CBT)'],
      certification: 'ATR: Registered Art Therapist',
      matchedTherapists: []
    };
  
  User.prototype.save = jest.fn().mockResolvedValue(mockUser);
  console.log("Mock implementation of save method:", User.prototype.save.mock);

	const response = await request(app).post('/users').send(mockUser);
  console.log("Response status:", response.status);
  console.log("Response body:", response.body);
  
	expect(response.status).toBe(201);
	expect(response.body).toEqual({
    userName:mockUser.userName,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    age: mockUser.age,
    gender: mockUser.gender,
    sexuality: mockUser.sexuality,
    location: mockUser.location,
    budget: mockUser.budget,
    therapyMode: mockUser.therapyMode,
    therapistGender: mockUser.therapistGender,
    therapyFocus: mockUser.therapyFocus,
    therapyMethods: mockUser.therapyMethods,
    certification: mockUser.certification,
  });
	
  });


  // it('should update a user successfully', async () => {
  //   const initialUser = {
  //     userName: '1234567',
  //     firstName: 'Tony',
  //     lastName: 'Smith',
  //     age: '20',
  //     gender: 'female',
  //     sexuality: 'Lesbian',
  //     location: 'Vancouver',
  //     therapyMode: 'Online',
  //     therapistGender: 'female',
  //   };

  //   const updatedUser = {
  //     userName: '1234567',
  //     firstName: 'Tony',
  //     lastName: 'Smith',
  //     age: '21', 
  //     gender: 'female',
  //     sexuality: 'Lesbian',
  //     location: 'Toronto',
  //     therapyMode: 'In-person',
  //     therapistGender: 'female',
  //   };

  //   // First send a POST request to create the user
  //   const initialResponse = await request(app).post('/users').send(initialUser);

  //   expect(initialResponse.status).toBe(201);
  //   expect(initialResponse.body).toEqual(initialUser);

  //   // Then send a PUT request to update the user
  //   const updateResponse = await request(app).put(`/users/${initialUser.userName}`).send(updatedUser);

  //   expect(updateResponse.status).toBe(200);
  //   expect(updateResponse.body).toEqual(updatedUser);
  // });


});