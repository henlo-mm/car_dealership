import { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { validateCaptcha } from '../../services/auth';

const RecaptchaComponent = ({ onCaptchaSuccess }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_CAPTCHA;

    const onChange = async (value) => {
        if (value) {
            console.log("CAPTCHA:", value);
            try {
                const response = await validateCaptcha(value);
                onCaptchaSuccess(response && response.success);
            } catch (error) {
                console.error('Error al validar CAPTCHA:', error);
                onCaptchaSuccess(false);
            }
        } else {
            onCaptchaSuccess(false);
        }
    };

    return (
        <ReCAPTCHA
            sitekey={apiKey}
            onChange={onChange}
        />
    );
};


export default RecaptchaComponent;
