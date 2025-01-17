// routes/matches.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const matchController = require('../controllers/matchController');
const verifyRole = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Niewłaściwy format pliku. Akceptowane są tylko pliki JPG.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
});

router.post(
    '/',
    verifyRole(['uberAdmin', 'admin', 'mod']),
    upload.fields([{ name: 'screenshot1', maxCount: 1 }, { name: 'screenshot2', maxCount: 1 }, { name: 'screenshot3', maxCount: 1 }]),
    matchController.addMatch
);
router.get('/', matchController.getAllMatches);
router.get('/team/:teamId', matchController.getMatchesByTeam);
router.get('/:id', matchController.getMatchById);
router.put(
    '/:id',
    verifyRole(['uberAdmin']),
    upload.fields([{ name: 'screenshot1', maxCount: 1 }, { name: 'screenshot2', maxCount: 1 }, { name: 'screenshot3', maxCount: 1 }]),
    matchController.updateMatch
);
router.delete('/:id', verifyRole(['uberAdmin', 'admin']), matchController.deleteMatch);
router.get('/tdm', matchController.getTdmMatches);
router.get('/ctf', matchController.getCtfMatches);

module.exports = router;
