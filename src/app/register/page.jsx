'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Cadastro() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        plano: 'gratis'
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');


        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const text = await res.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (jsonErr) {
                console.error('[Frontend] Resposta não é JSON:', jsonErr);
                throw new Error('Resposta inesperada do servidor');
            }


            if (!res.ok) throw new Error(data.error || 'Erro no cadastro');

            setSuccess('Usuário cadastrado com sucesso! Redirecionando...');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err) {
            console.error('[Frontend] Erro no cadastro:', err);
            setError(err.message || 'Erro ao cadastrar usuário');
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" name="nome" className="form-control" value={formData.nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" name="senha" className="form-control" value={formData.senha} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Plano</label>
                    <select name="plano" className="form-select" value={formData.plano} onChange={handleChange}>
                        <option value="gratis">Grátis</option>
                        <option value="premium">Premium</option>
                    </select>

                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
}
