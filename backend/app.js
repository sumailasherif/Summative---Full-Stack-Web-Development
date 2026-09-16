const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const customerRoutes = require('./routes/customerRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
// const rentalRoutes = require('./routes/rentalRoutes'); for sherif
// const dashboardRoutes = require('./routes/dashboardRoutes'); for sherif

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/customers', customerRoutes);
app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/rentals', rentalRoutes);for sherif
// app.use('/api/dashboard', dashboardRoutes);for sherif

app.get('/', (req, res) => {
  res.send('Vehicle Rental Management System API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});