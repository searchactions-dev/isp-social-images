import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ImageGenerator = () => {
    const [service, setService] = useState('SOC 1');
    const [logo, setLogo] = useState<File | null>(null);
    const [layout, setLayout] = useState('light'); // New state for layout

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

    // Function to generate image previews
    const generateImagePreview = (platform: string) => {
        const serviceImage = {
            'CCPA': '/assets/img/badges/CCPA.svg',
            'FISMA': '/assets/img/badges/FISMA.svg',
            'GDPR': '/assets/img/badges/GDPR.svg',
            'GLBA': '/assets/img/badges/GLBA.svg',
            'HITRUST': '/assets/img/badges/HITRUST.svg',
            'HIPAA': '/assets/img/badges/HIPAA.svg',
            'ISO 27001': '/assets/img/badges/SO-27001.svg',
            'ISO 50001': '/assets/img/badges/ISO-50001.svg',
            'NERC CIP': '/assets/img/badges/NERC-CIP.svg',
            'NIST': '/assets/img/badges/NIST.svg',
            'Pentest': '/assets/img/badges/Pentest.svg',
            'PCI DSS': '/assets/img/badges/PCI-DSS.svg',
            'SOC 1': '/assets/img/badges/SOC-1.svg',
            'SOC 2': '/assets/img/badges/SOC2.svg',
            'SOC 3': '/assets/img/badges/SOC3.svg',
            'SOC for Cybersecurity': '/assets/img/badges/Soc-for-cybersecurity.svg',
            'SOC for Vendor Supply Chain': '/assets/img/badges/Soc-for-vendor-supply-chain.svg',
            'SSAE-19': '/assets/img/badges/SSAE-19.svg',
            'SOX': '/assets/img/badges/SOX.svg',
        };

        return (
            <div className="h-full">
                <div className="flex justify-center items-center gap-24 h-full">
                    <div className="flex flex-col items-center justify-center text-center gap-24">
                        {logo && <img src={URL.createObjectURL(logo)} alt="Logo" className="logo" />}
                        <p className="achieved-audit">Achieved Their <span>{service}</span> Audit</p>
                    </div>
                    {service && <img src={serviceImage[service]} alt={`${service} Image`} className="service-image" />}
                </div>
            </div>
        );
    };

    const downloadImage = (platform: string) => {
        const element = document.getElementById(`${platform}-preview`);
        if (element) {
            html2canvas(element, { scale: 1 }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg', 1.0);
                link.download = `${platform}.jpg`;
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }).catch((error) => {
                console.error("Error capturing the image:", error);
            });
        } else {
            console.error(`Element with ID ${platform}-preview not found.`);
        }
    };

    return (
        <div className="p-5 bg-gray-100 flex">
            <div className="flex-1">
                <select value={service} onChange={(e) => setService(e.target.value)} className="border p-2 mb-4 w-full max-w-xs">
                    {services.map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                    ))}
                </select>
                <select value={layout} onChange={(e) => setLayout(e.target.value)} className="border p-2 mb-4 w-full max-w-xs">
                    <option value="light">Light Layout</option>
                    <option value="dark">Dark Layout</option>
                </select>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleLogoChange}
                    className="border p-2 mb-4 w-full max-w-xs"
                />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Image Previews</h3>
                <div className="image-preview">
                    <div id="facebook-preview" className={layout} style={{ width: '1200px', height: '630px' }}>
                        {generateImagePreview('facebook')}
                    </div>
                    <button onClick={() => downloadImage('facebook')}>
                        Download Facebook Image
                    </button>
                </div>
                <div className="image-preview">
                    <div id="linkedin-preview" className={layout} style={{ width: '1200px', height: '627px' }}>
                        {generateImagePreview('linkedin')}
                    </div>
                    <button onClick={() => downloadImage('linkedin')}>
                        Download LinkedIn Image
                    </button>
                </div>
                <div className="image-preview">
                    <div id="twitter-preview" className={layout} style={{ width: '1200px', height: '675px' }}>
                        {generateImagePreview('twitter')}
                    </div>
                    <button onClick={() => downloadImage('twitter')}>
                        Download Twitter Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator; 