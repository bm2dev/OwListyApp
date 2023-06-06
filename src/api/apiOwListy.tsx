import axios from 'axios';
import { ENV } from '../../env';

export const apiOwListy = axios.create({
	baseURL: ENV.apiOwListyURL,
});
