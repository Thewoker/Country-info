import { Router } from 'express';
import { getAvailableCountries, getCountryInfo } from '../controllers/countryController.js';

const router = Router();

router.get('/available-countries', getAvailableCountries);
router.get('/country-info/:countryCode', getCountryInfo);

export default router;
