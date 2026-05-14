import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';

import { connectDB } from './config/db.js';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'replace-with-your-session-secret',
    resave: false,
    saveUninitialized: false
    // TODO: Add secure production cookie configuration
  })
);

// TODO: Implement flash messages if desired
app.use((req, res, next) => {
  res.locals.currentUser = null;
  res.locals.flash = null;
  next();
});

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// TODO: Implement database connection setup
connectDB();

app.get('/', (req, res) => {
  // TODO: Replace with role-based dashboard redirect logic
  res.redirect('/dashboard');
});

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

app.get('/dashboard', (req, res) => {
  // TODO: Protect this route with auth middleware
  res.render('dashboard/home', { pageTitle: 'Dashboard Home' });
});

app.get('/settings', (req, res) => {
  // TODO: Protect this route with auth middleware
  res.render('dashboard/settings', { pageTitle: 'Settings' });
});

app.get('/profile', (req, res) => {
  // TODO: Protect this route with auth middleware
  res.render('dashboard/profile', { pageTitle: 'Profile' });
});

app.use((req, res) => {
  res.status(404).render('errors/404', { pageTitle: 'Page Not Found' });
});

app.listen(PORT, () => {
  // TODO: Replace console log with production-ready logger if needed
  console.log(`Server running on http://localhost:${PORT}`);
});
