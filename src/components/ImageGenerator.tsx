import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ImageGenerator = () => {
    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState('');
    const [auditName, setAuditName] = useState('');
    const [service, setService] = useState('SOC 1');
    const [logo, setLogo] = useState<File | null>(null);

    const services = ['SOC 1', 'SOC 2', 'SOC 3'];

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLogo(event.target.files[0]);
        }
    };

    // Function to generate image previews
    const generateImagePreview = (platform: string) => {
        return (
            <div>
                {logo && <img src={URL.createObjectURL(logo)} alt="Logo" style={{ maxWidth: '100%' }} />}
                <h4 className="company-name">{companyName}</h4>
                <p className="achieved-audit">Achieved Their <span>{service}</span> Audit</p>
                <p className="date">{date}</p>
            </div>
        );
    };

    const downloadImage = (platform: string) => {
        const element = document.getElementById(`${platform}-preview`);
        if (element) {
            html2canvas(element, { scale: 1 }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg', 1.0);
                link.download = `${companyName}_${platform}.jpg`;
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
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border p-2 mb-4 w-full max-w-xs"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 mb-4 w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Audit Name"
                    value={auditName}
                    onChange={(e) => setAuditName(e.target.value)}
                    className="border p-2 mb-4 w-full max-w-xs"
                />
                <select value={service} onChange={(e) => setService(e.target.value)} className="border p-2 mb-4 w-full max-w-xs">
                    {services.map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                    ))}
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
                    <div id="facebook-preview" style={{ width: '1200px', height: '630px' }}>
                        {generateImagePreview('facebook')}
                    </div>
                    <button onClick={() => downloadImage('facebook')}>
                        Download Facebook Image
                    </button>
                </div>
                <div className="image-preview">
                    <div id="linkedin-preview" style={{ width: '1200px', height: '627px' }}>
                        {generateImagePreview('linkedin')}
                    </div>
                    <button onClick={() => downloadImage('linkedin')}>
                        Download LinkedIn Image
                    </button>
                </div>
                <div className="image-preview">
                    <div id="twitter-preview" style={{ width: '1200px', height: '675px' }}>
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