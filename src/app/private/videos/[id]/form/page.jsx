import { getVideoPorIdDB, addVideoDB, updateVideoDB } from '@/bd/usecases/videoUseCase';
import { getCategoriasDB } from '@/bd/usecases/categoriaUseCase';
import CampoEntradaFloating from '@/components/comuns/CampoEntradaFloating';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';
import { redirect } from 'next/navigation';

const FormularioPage = async ({ params }) => {
    const { id } = params;
    const videoId = id;


    let categorias = [];
    try {
        categorias = await getCategoriasDB();
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }

    let video = {
        id: '',
        titulo: '',
        descricao: '',
        url_video: '',
        categoria_id: '',
        duracao: '',
        capa_video: '',
        tipo: '',
    };

    if (videoId) {
        try {
            video = await getVideoPorIdDB(videoId);
        } catch (error) {
            console.error('Erro ao buscar vídeo:', error);
        }
    }

    const salvarVideo = async (formData) => {
        'use server';
        const objeto = {
            id: formData.get('id'),
            titulo: formData.get('titulo'),
            descricao: formData.get('descricao'),
            url_video: formData.get('url_video'),
            categoria_id: formData.get('categoria_id'),
            duracao: formData.get('duracao'),
            capa_video: formData.get('capa_video'),
            tipo: formData.get('tipo'),
        };

        try {
            if (objeto.id === '') {
                await addVideoDB(objeto);
            } else {
                await updateVideoDB(objeto);
            }
        } catch (err) {
            console.error('Erro ao salvar vídeo:', err);
            throw new Error('Erro: ' + err);
        }

        redirect('/private/videos');
    };

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Vídeo {videoId ? videoId : 'Novo'}</h2>
                </div>
                <form action={salvarVideo}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">

                                <CampoEntradaFloating
                                    id="txtId"
                                    label="ID"
                                    name="id"
                                    value={video.id}
                                    tipo="text"
                                    readOnly={true}
                                    required={false}
                                />


                                <CampoEntradaFloating
                                    id="txtTitulo"
                                    label="Título"
                                    name="titulo"
                                    value={video.titulo}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />


                                <CampoEntradaFloating
                                    id="txtDescricao"
                                    label="Descrição"
                                    name="descricao"
                                    value={video.descricao}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />


                                <CampoEntradaFloating
                                    id="txtUrlVideo"
                                    label="URL do Vídeo"
                                    name="url_video"
                                    value={video.url_video}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />

                                <div className="form-group">
                                <label htmlFor="txtCategoriaId">Categoria</label>
                                <select
                                    id="txtCategoriaId"
                                    name="categoria_id"
                                    defaultValue={video.categoria_id}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.codigo} value={categoria.codigo}>
                                            {categoria.nome} - {categoria.codigo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                                <br></br>
                                <CampoEntradaFloating
                                    id="txtDuracao"
                                    label="Duração (segundos)"
                                    name="duracao"
                                    value={video.duracao}
                                    tipo="number"
                                    readOnly={false}
                                    required={true}
                                />

                                {/* Campo URL da Capa */}
                                <CampoEntradaFloating
                                    id="txtCapaVideo"
                                    label="URL da Capa"
                                    name="capa_video"
                                    value={video.capa_video}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />

                                {/* Campo Tipo */}
                                <CampoEntradaFloating
                                    id="txtTipo"
                                    label="Tipo"
                                    name="tipo"
                                    value={video.tipo}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />

                                {/* Botão Salvar */}
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
