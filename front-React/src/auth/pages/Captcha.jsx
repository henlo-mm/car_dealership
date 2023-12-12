import { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { validateCaptcha } from '../../services/auth';

const RecaptchaComponent = ({ onCaptchaSuccess }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_CAPTCHA;

    const onChange = async (value) => {
        if (value) {
            const result = await validateCaptcha(value);
            onCaptchaSuccess(result.success);
        } else {
            onCaptchaSuccess(false);
        }
    };

    return (
        <div>
            <ReCAPTCHA
                sitekey={apiKey}
                onChange={onChange}
            />
        </div>
    );
};

export default RecaptchaComponent;
