import React, { useState } from 'react';
import { toPng, toJpeg } from 'dom-to-image-retina';

const ImageGenerator = () => {
    const [service, setService] = useState('SOC 1');
    const [logo, setLogo] = useState<File | null>(null);
    const [layout, setLayout] = useState('light'); // New state for layout
    const [companyLogo, setCompanyLogo] = useState<File | null>(null); // Updated state for company logo

    const services = [
        'CCPA', 
        'FISMA', 
        'GDPR', 
        'GLBA', 
        'HITRUST', 
        'HIPAA', 
        'ISO 27001', 
        'ISO 50001', 
        'NERC CIP', 
        'NIST', 
        'Pentest', 
        'PCI DSS', 
        'SOC 1', 
        'SOC 2', 
        'SOC 3', 
        'SOC for Cybersecurity', 
        'SOC for Vendor Supply Chain', 
        'SSAE-19', 
        'SOX'
    ];

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLogo(event.target.files[0]);
        }
    };

    const handleCompanyLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setCompanyLogo(event.target.files[0]);
        }
    };

    // Function to generate image previews
    const generateImagePreview = (platform: string) => {
        const serviceImage = {
            'CCPA': '/assets/img/badges/CCPA.svg',
            'FISMA': '/assets/img/badges/FISMA.svg',
            'GDPR': '/assets/img/badges/GDPR.svg',
            'GLBA': '/assets/img/badges/GLBA.svg',
            'HITRUST': '/assets/img/badges/HITRUST.svg',
            'HIPAA': '/assets/img/badges/HIPAA.svg',
            'ISO 27001': '/assets/img/badges/ISO-27001.svg',
            'ISO 50001': '/assets/img/badges/ISO-50001.svg',
            'NERC CIP': '/assets/img/badges/NERC-CIP.svg',
            'NIST': '/assets/img/badges/NIST.svg',
            'Pentest': '/assets/img/badges/Pentest.svg',
            'PCI DSS': '/assets/img/badges/PCI-DSS.svg',
            'SOC 1': '/assets/img/badges/SOC-1.svg',
            'SOC 2': '/assets/img/badges/SOC-2.svg',
            'SOC 3': '/assets/img/badges/SOC-3.svg',
            'SOC for Cybersecurity': '/assets/img/badges/Soc-for-cybersecurity.svg',
            'SOC for Vendor Supply Chain': '/assets/img/badges/Soc-for-vendor-supply-chain.svg',
            'SSAE-19': '/assets/img/badges/SSAE-19.svg',
            'SOX': '/assets/img/badges/SOX.svg',
        };

        return (
            <div className="h-full">
                <div className="flex justify-center items-center h-full relative">
                    <div className="flex flex-col items-center justify-center text-center gap-4 preview-content w-1/2 p-6">
                        {companyLogo && <img src={URL.createObjectURL(companyLogo)} alt="Company Logo" className="client-logo" style={{ maxWidth: '260px' }} />}
                        <p className="achieved-audit">Achieved Their <span>{service}</span> Audit </p>
                    </div>
                    <div className="preview-image w-1/2 flex justify-center items-center">
                        {service && <img src={serviceImage[service]} alt={`${service} Image`} className="service-image" />}
                    </div>
                </div>
            </div>
        );
    };

    const downloadImage = async (platform: string) => {
        const element = document.querySelector(`div#${platform}-preview.hide-fix`);
        if (element) {
            try {
                const dataUrl = await toJpeg(element, { quality: 1.0 });
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `social-media-${platform}-${service}.jpg`; // Updated filename format
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
            }
        } else {
        }
    };

    return (
        <div className="flex flex-col xl:flex-row w-full" style={{ backgroundColor: '#fafaff' }}>
            <div className="flex flex-col gap-4 p-12 sidebar w-full xl:w-1/4">
                <div className="flex flex-row align-center items-center gap-2">
                <label htmlFor="company-logo">Upload Company Logo</label>
                <input
                    id="company-logo"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleCompanyLogoChange}
                    className="border p-2 w-full max-w-xs"
                />
                </div>
                <div className="flex flex-row align-center items-center gap-2">
                <label htmlFor="service-select">Select Service:</label>
                <select id="service-select" value={service} onChange={(e) => setService(e.target.value)} className="border p-2 w-full max-w-xs">
                    {services.map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                    ))}
                </select>
                </div>
                <div className="flex flex-row align-center items-center gap-2">
                <label htmlFor="layout-select">Select Layout:</label>
                <select id="layout-select" value={layout} onChange={(e) => setLayout(e.target.value)} className="border p-2 w-full max-w-xs">
                    <option value="light">Light Layout</option>
                    <option value="dark">Dark Layout</option>
                </select>
                </div>
            </div>
            <div className="pt-4 image-panel p-2 w-full xl:w-3/4">
            <h1 className="text-m md:text-2xl font-bold mb-2">IS Partners Automated Social Media Generator Tool</h1>
                <h3 className="text-sm md:text-lg mb-2">Social Media Image Previews</h3>
                <div className="image-preview">
                    <div id="facebook-preview" className={`${layout} not-hidden ${service.replace(/\s+/g, '-').toLowerCase()}`} style={{ aspectRatio: '40 / 21' }}>
                        {generateImagePreview('facebook')}
                    </div>

                    <div id="facebook-preview" className={`${layout} hide-fix ${service.replace(/\s+/g, '-').toLowerCase()}`} style={{ width: '1200px', height: '630px' }}>
                        {generateImagePreview('facebook')}
                    </div>
                    <button onClick={() => downloadImage('facebook')}>
                        Download Facebook Image
                    </button>
                </div>
                <div className="image-preview">
                    <div id="linkedin-preview" className={`${layout} not-hidden ${service.replace(/\s+/g, '-').toLowerCase()}`} style={{ aspectRatio: '1.91/1' }}>
                        {generateImagePreview('linkedin')}
                    </div>
                    <div id="linkedin-preview" className={`${layout} hide-fix ${service.replace(/\s+/g, '-').toLowerCase()}`} style={{width: '1200px', height: '627px' }}>
                        {generateImagePreview('linkedin')}
                    </div>
                    <button onClick={() => downloadImage('linkedin')}>
                        Download LinkedIn Image
                    </button>
                </div>
                <div className="image-preview">
                    <div id="twitter-preview" className={`${layout} not-hidden ${service.replace(/\s+/g, '-').toLowerCase()}`} style={{ aspectRatio: '16/9' }}>
                        {generateImagePreview('twitter')}
                    </div>
                    <div id="twitter-preview" className={`${layout} hide-fix ${service.replace(/\s+/g, '-').toLowerCase()}`} style={{ width: '1200px', height: '675px' }}>
                        {generateImagePreview('twitter')}
                    </div>
                    <button onClick={() => downloadImage('twitter')}>
                        Download X Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator; 