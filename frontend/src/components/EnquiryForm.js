import React, { useState } from 'react';
import api from '../api';

export default function EnquiryForm({ productId = null, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Valid email is required';
    if (!form.message.trim()) err.message = 'Message is required';
    return err;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    setStatus(null);

    api.post('/enquiries', { product_id: productId, ...form })
      .then(() => {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      })
      .catch(err => {
        console.error(err);
        setStatus('error');
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <div role="dialog" aria-modal="true" className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        <h3>Send Enquiry</h3>

        {status === 'success' && <div className="alert success">Enquiry submitted successfully.</div>}
        {status === 'error' && <div className="alert error">Failed to submit enquiry. Try again later.</div>}

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              required
            />
          </label>
          {errors.name && <div className="field-error">{errors.name}</div>}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              required
            />
          </label>
          {errors.email && <div className="field-error">{errors.email}</div>}

          <label>
            Phone (optional)
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              aria-invalid={!!errors.message}
              required
            />
          </label>
          {errors.message && <div className="field-error">{errors.message}</div>}

          <div className="form-actions">
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Sending...' : 'Submit'}
            </button>
            <button type="button" className="btn alt" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
