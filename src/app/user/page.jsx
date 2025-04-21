'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function User() {
    const { data: session, update: updateSession } = useSession();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        plano: '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (session?.user) {
            setFormData({
                nome: session.user.name || '',
                email: session.user.email || '',
                senha: '',
                plano: session.user.plano || 'gratis',
            });
        }
    }, [session]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw errData.error || 'Erro ao atualizar dados';
            }

            setSuccess('Dados atualizados com sucesso!');

            try {
                await updateSession({
                    user: {
                        name: formData.nome,
                        plano: formData.plano
                    }
                });

            } catch (updateErr) {
                console.error("Error updating session:", updateErr);
            }

        } catch (err) {
            setError(err.toString());
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <h2>Meus Dados</h2>
            {session?.user ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" value={formData.email} readOnly />
                        </div>
                        <div className="mb-3">
                            <label>Senha (nova)</label>
                            <input type="password" className="form-control" name="senha" value={formData.senha} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label>Plano</label>
                            <select name="plano" className="form-select" value={formData.plano} onChange={handleChange}>
                                <option value="gratis">Grátis</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>

                    <div className="mt-4">
                        <h4>Dados da Sessão Atual</h4>
                        <div className="card">
                            <div className="card-body">
                                <p><strong>Nome:</strong> {session.user.name}</p>
                                <p><strong>Email:</strong> {session.user.email}</p>
                                <p><strong>Plano:</strong> {session.user.plano || 'Não definido'}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Você precisa estar logado para ver esta página.</p>
            )}
        </div>
    );
}