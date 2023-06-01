
import Grafico from "../../components/grafico/grafico"
import RecomendacoesLivros from "../../components/recomendacao"
import AutoresCurtidos from "../../components/autorestop10"
import LivrosCurtidosPorFaixaEtaria from "../../components/top10faixaetaria"


export default function Top10() {
    return (
        <div>
            <RecomendacoesLivros />

            <AutoresCurtidos />

            <LivrosCurtidosPorFaixaEtaria/>
           
            <Grafico />

        </div>
    )
}