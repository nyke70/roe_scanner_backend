const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('./utile');
const User = require('./user');
const Report = require('./secur');
const DataLeak = require('./principauxFonct/dataLeak');
const SecurityReport = require('./principauxFonct/securityReport'); 
const DeviceSecurity = require('./principauxFonct/deviceSecurity');
const InstalledApp = require('./principauxFonct/installedApp');
const NetworkScan = require('./principauxFonct/networkScan');
const PrivacyConfig = require('./principauxFonct/privacyConfig');
const securityReport = require('./principauxFonct/securityReport');
require('dotenv').config();

const app = express();
app.use(express.json());

// 🔐 Middleware JWT
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: 'Token invalide' });
  }
};

// 🧠 Fonction de scoring
const calculateScore = (data) => {
  let score = 0;
  if (data.root) score += 50;
  if (data.sourcesInconnues) score += 15;
  if (data.certificatUtilisateur) score += 25;
  if (data.appliSensibles) score += 40;
  if (data.httpDetecte) score += 10;
  if (!data.verrouillageEcran) score += 30;
  if (data.patchRetard) score += 15;
  return score;
};

// 🚀 Routes API

// Inscription
app.post('/api/v1/register', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ email: req.body.email, password: hash });
    res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l’inscription', error: err.message });
  }
});

// Connexion
app.post('/api/v1/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Profil utilisateur
app.get('/api/v1/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ['id', 'email'] });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil', error: err.message });
  }
});

// Création d’un rapport
app.post('/api/v1/reports', auth, async (req, res) => {
  try {
    const score = calculateScore(req.body);
    const report = await Report.create({
      score,
      details: req.body,
      UserId: req.userId,
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du rapport', error: err.message });
  }
});

// Liste des rapports
app.get('/api/v1/reports1', auth, async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: { UserId: req.userId },
      order: [['createdAt', 'DESC']],
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des rapports', error: err.message });
  }
});

// Test route
app.get('/api/v1/do', (req, res) => {
  res.send('🚀 API Scanner de Sécurité opérationnelle');
});
app.post('/api/v1/dataleak', async (req, res) => {
    try {
        const dataleak = await DataLeak.create({
            
        });
    } catch (error) {
        
    }
});
app.post('/api/v1/deviceSecurity', async (req, res) => {
    try {
        const deviceSecurity = await DeviceSecurity.create({
            
        });
    } catch (error) {
        
    }
});
app.post('/api/v1/installedApp', async (req, res) => {
    try {
        const installedApp = await InstalledApp.create({
            
        });
    } catch (error) {
        
    }
});
app.post('/api/v1/networkScan', async (req, res) => {
    try {
        const networkScan = await NetworkScan.create({
            
        });
    } catch (error) {
        
    }
});
app.post('/api/v1/privacyConfig', async (req, res) => {
    try {
        const privacyConfig = await PrivacyConfig.create({
            
        });
    } catch (error) {
        
    }
});
app.post('/api/v1/securityReport', async (req, res) => {
    try {
        const securityReport= await SecurityReport.create({
            
        });
    } catch (error) {
        
    }
});
const PORT = process.env.PORT || 3000;
// Lancement serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
  });
});