import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', department: 'Engineering'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                department: initialData.department || 'Engineering'
            });
        }
    }, [initialData]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = "First name is required.";
        if (!formData.lastName) tempErrors.lastName = "Last name is required.";
        if (!formData.email) tempErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) onSubmit(formData);
    };

    return (
        // Add animation to the modal overlay
        <div className="form-modal-overlay animate__animated animate__fadeIn">
            <div className="form-modal animate__animated animate__zoomIn">
                <h2>{initialData ? 'Edit User' : 'Add New User'}</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <select name="department" value={formData.department} onChange={handleChange}>
                            <option>Engineering</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                            <option>Human Resources</option>
                            <option>Design</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn-primary">Save User</button>
                    </div>
                </form>
            </div>
            <style jsx>{`
                .form-modal-overlay { 
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.6); 
                    display: flex; align-items: center; justify-content: center; z-index: 1000;
                    backdrop-filter: blur(5px);
                }
                .form-modal { 
                    background: white; padding: 2.5rem; border-radius: 15px; 
                    width: 100%; max-width: 450px;
                    box-shadow: var(--shadow);
                    animation-duration: 0.4s; /* Control animation speed */
                }
                h2 { margin-top: 0; text-align: center; color: var(--text-dark); }
                .form-group { margin-bottom: 1.5rem; }
                .form-group label { 
                    display: block; margin-bottom: 0.5rem; font-weight: 500;
                    color: var(--text-light);
                }
                .form-group input, .form-group select { 
                    width: 100%; padding: 12px;
                    border: 1px solid var(--border-color); 
                    border-radius: 8px; font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .form-group input:focus, .form-group select:focus {
                    outline: none;
                    border-color: var(--primary-accent);
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                }
                .error { color: var(--danger-color); font-size: 0.8rem; padding-top: 5px; }
                .form-actions { 
                    display: flex; justify-content: flex-end; 
                    gap: 1rem; margin-top: 2rem; 
                }
                .btn-cancel {
                  background-color: #f1f1f1;
                  color: var(--text-light);
                  box-shadow: none;
                }
                .btn-cancel:hover {
                  background-color: #e0e0e0;
                }
            `}</style>
        </div>
    );
};

export default UserForm;

