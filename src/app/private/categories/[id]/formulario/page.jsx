import { getCategoriaPorCodigoDB, addCategoriaDB, updateCategoriaDB } from '@/bd/usecases/categoriaUseCase';
import CampoEntradaFloating from '@/components/comuns/CampoEntradaFloating';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';
import { redirect } from 'next/navigation';

const FormularioPage = async ({ params }) => {
    const { id } = params;
    const codigo = Number(id);

    let categoria = { codigo: 0, nome: "" };

    if (codigo !== 0) {
        try {
            categoria = await getCategoriaPorCodigoDB(codigo);
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
        }
    }

    const salvarCategoria = async (formData) => {
        'use server';
        const objeto = {
            codigo: Number(formData.get('codigo')),
            nome: formData.get('nome')
        };

        try {
            if (objeto.codigo === 0) {
                await addCategoriaDB(objeto);
            } else {
                await updateCategoriaDB(objeto);
            }
        } catch (err) {
            console.error('Erro ao salvar categoria:', err);
            throw new Error('Erro: ' + err);
        }

        redirect('/private/categories');
    };

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Categoria {codigo === 0 ? 'Nova' : codigo}</h2>
                </div>
                <form action={salvarCategoria}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <CampoEntradaFloating
                                    id="txtCodigo"
                                    label="Código"
                                    name="codigo"
                                    value={categoria.codigo}
                                    tipo="number"
                                    readOnly={true}
                                    required={false}
                                />
                                <CampoEntradaFloating
                                    id="txtNome"
                                    label="Nome"
                                    name="nome"
                                    value={categoria.nome}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />
                                <div className="form-group text-center mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Salvar <i className="bi bi-save"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Suspense>
        </div>
    );
};

export default FormularioPage;
