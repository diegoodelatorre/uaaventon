import request from 'supertest';
import app from '../src/app.js';
import db from '../src/conf/db.js';

// mock
vi.mock('../src/config/db.js', () => ({
  default: {
    execute: vi.fn().mockResolvedValue([[], []]),
    getConnection: vi.fn().mockResolvedValue({
      beginTransaction: vi.fn(),
      execute: vi.fn(),
      commit: vi.fn(),
      rollback: vi.fn(),
      release: vi.fn()
    })
  }
}));

describe('Integration Tests - UAAventon API', () => {

  describe('POST /api/auth/register (US01)', () => {
    it('deberia rechazar correos que no sean @edu.uaa.mx (HTTP 400)', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          first_name: 'Diego',
          last_name: 'Delgado',
          uaa_email: 'diego@gmail.com', // correo invalido
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('El correo debe ser institucional (@edu.uaa.mx)');
    });

    it('deberia aceptar un registro valido y devolver un 201', async () => {

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          first_name: 'Diego',
          last_name: 'Delgado',
          uaa_email: 'diego@edu.uaa.mx',
          password: 'Contra123'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Usuario registrado exitosamente');
    });
  });

  describe('POST /api/vehicles (US02)', () => {
    it('deberia rechazar el registro de un vehículo si la placa es invalida', async () => {
      const response = await request(app)
        .post('/api/vehicles')
        .send({
          user_id: 1,
          make: 'Nissan',
          model: 'Versa',
          year: 2015,
          color: 'Rojo',
          license_plate: 'PLACA-MALA-12345', // Muy larga
          license_number: 'A-1234567'
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('Formato de placa inválido');
    });
  });

  describe('POST /api/trips (US03)', () => {
    it('debería rechazar la publicación de un viaje si faltan datos obligatorios', async () => {
      const response = await request(app)
        .post('/api/trips')
        .send({
          driver_id: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

});