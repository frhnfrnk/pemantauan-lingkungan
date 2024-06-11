'use client';

import React, { useState } from 'react';
import axios from 'axios';
import "./notif.css";

const NotifForm = () => {
    const [nama, setNama] = useState('');
    const [nomorHp, setNomorHp] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = {
            "name": nama,
            "email": email,
            "phoneNumber": nomorHp
        }
        try {
            const response = await axios.post('https://iai-notification-service.onrender.com/api/users', user);
            alert('Form telah berhasil disubmit!');
        } catch (error) {
            alert('Form gagal disubmit!');
        }
    };

    return (
        <div className="content">
            <div className="container">
                <a href="/"><button className='back-button'>Back</button></a>
                <h1>Form Pemantauan Lingkungan</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nama">Nama:</label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomor_hp">Nomor HP:</label>
                        <input
                            type="text"
                            id="nomor_hp"
                            name="nomor_hp"
                            value={nomorHp}
                            onChange={(e) => setNomorHp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='submit-button'>Submit</button>
                </form>
            </div>
        </div>

    );
};

export default NotifForm;