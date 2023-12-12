import { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { validateCaptcha } from '../../services/auth';

const RecaptchaComponent = ({ onCaptchaSuccess }) => {
    const [captchaValue, setCaptchaValue] = useState(null);
    const apiKey = import.meta.env.VITE_GOOGLE_CAPTCHA;
    useEffect(() => {
        if (captchaValue) {
            const validate = async () => {
                try {
                    const response = await validateCaptcha(captchaValue);
                    if (response.success) {
                        onCaptchaSuccess(true);
                    } else {
                        onCaptchaSuccess(false);
                    }
                } catch (error) {
                    console.error('Error al validar el CAPTCHA:', error);
                    onCaptchaSuccess(false);
                }
            };

            validate();
        }
    }, [captchaValue, onCaptchaSuccess]);

    const onChange = (value) => {
        setCaptchaValue(value);
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
