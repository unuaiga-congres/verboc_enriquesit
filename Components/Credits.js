// Components/Credits.js

import Layout from '../Template/Layout';
import { StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import RenderHTMLSource from 'react-native-render-html';



import commonStyles from '../Template/commonStyles';

const Credits = function ({ navigation, route }) {




  return (

    <Layout>
                <ScrollView style={commonStyles.scrollView}>
                  <TouchableOpacity onPress={() => navigation.navigate('Informations')}>
                    <Text style={styles.change_lang}>Lire en français</Text>
                  </TouchableOpacity>
                  <RenderHTMLSource source={{html: `
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Crèdits</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b><i>Vèrb'Òc</i> - conjugator automatic occitan</b> es una aplicacion informatica que permet de trobar sul pic la conjugason de nombroses vèrbes occitans amb una granda comoditat e rapiditat d'utilizacion.</p>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Aplicacion</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Desvolopament aplicacions telefonets e API&nbsp;:</b> Aure Séguier (<a href="https://locongres.org" target="_blank" style="color: #43168c; text-decoration:none;">Lo Congrès</a>)</p>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugador occitan lengadocian</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Lo conjugator en occitan lengadocian es una òbra normativa del Congrès permanent de la lenga occitana. Lo faguèron dins la continüitat de trabalhs descriptius e normatius occitanistas anteriors : <i>Gramatica occitana</i> e <i>Dictionnaire Occitan-Français</i> de Loís Alibèrt (version numerica Josiana Ubaud, Patric Sauzet GIDILOC, extraccion d’entradas Sergi Granièr), <i>Diccionari</i> de Cristian Laus, <i>Lo Vèrb occitan</i> de Patric Sauzet e Josiana Ubaud, <i>Los Vèrbs conjugats</i> de Partici Pojada, <i>Las Preconizacions del Conselh de la lenga occitana</i>, òbra collectiva mesa en forma per Domergue Sumien, <i>Conjugaison occitane</i> de Patric Sauzet.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classament dels vèrbes, sistèma de modèles&nbsp;:</b> Patric Sauzet.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Lexic de vèrbes&nbsp;:</b> Patric Sauzet, Francés Pic, Sèrgi Granièr.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Desvolopament&nbsp;:</b> Domenge Château-Annaud.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Integracion dels modèles e de la basa de donadas&nbsp;:</b> Aure Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Correccions&nbsp;:</b> Bernat Molin, Arvèi Lieutard, Domergue Sumien, Jacme Taupiac, Domenge Château-Annaud, Cedric Valmary, Aure Séguier.</p>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugador occitan gascon</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Lo conjugador automatic en occitan gascon es una òbra normativa del Congrès permanent de la lenga occitana. Foguèt fait en perlongament de la classificacion dels vèrbes en occitan lengadocian de P. Sauzet, e en continüitat dels trabalhs descriptius e normatius anteriors : <i>Dictionnaire français-occitan (gascon)</i> de M. Grosclaude, G. Nariòo e P. Guilhèmjoan, <i>Fichas de gramatica d'occitan gascon normat</i> 1 d'A. Bianchi e A. Viaut, <i>Gramatica d'occitan gascon contemporanèu</i> de M. Romieu e A. Bianchi, <i>Lo Vèrb occitan</i> de Patric Sauzet e Josiana Ubaud, <i>Los Vèrbs conjugats</i> de Partici Pojada, <i>Las Preconizacions del Conselh de la lenga occitana</i>, òbra collectiva mesa en forma per Domergue Sumien.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Direccion scientifica&nbsp;:</b> M. Romieu, A. Bianchi.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classament dels vèrbes, sistèma de modèles&nbsp;:</b> F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Lexic dels vèrbes&nbsp;:</b> A. Bianchi (a partir dels trabalhs d'E. Astier e G. Nariòo).</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Relectura e correccions&nbsp;:</b> M. Romieu, A. Bianchi.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Desvolopament e tractament de las donadas&nbsp;:</b> A. Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Mercejaments&nbsp;:</b> A. Viaut.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Fonts&nbsp;:</b></p>
                  <ul>
                    <li style="color:#454545;">F. Mistral, <i>Trésor du Felibrige ou Dictionnaire Provençal-Français</i>, Genève-Paris : Slatkine, ed. de l'Unicorne, Paris-Genève, 1979, tome 1 A-F, 1200 p., tome II G-Z, 1170 p.</li>
                    <li style="color:#454545;">N. Rey Bèthvéder, <i>Dictionnaire français / occitan, (gascon toulousain)</i>, Puylaurens : ed. I.E.O., 2004, 309 p.</li>
                    <li style="color:#454545;">S. Palay, <i>Dictionnaire du béarnais et du gascon modernes</i>, Paris : CNRS, 1991</li>
                    <li style="color:#454545;">M Grosclaude, G. Narioo, P. Guilhemjoan, <i>Dictionnaire français-occitan (gascon)</i>, 2 vol., ed. Per Noste, 2004</li>
                    <li style="color:#454545;">V. Lespy, P. Raymond, <i>Dictionnaire béarnais ancien et moderne</i>, novèla edicion tornada véser e corregida per J. Lafitte, Belin-Béliet : ed. Princi negre, 1998, 613 p.</li>
                    <li style="color:#454545;">A. Bianchi, A. Viaut, <i>Fichas de Gramatica d'Occitan Gascon Normat</i> 1, Talence : Presses Universitaires de Bordeaux, coll. : Images, 1995, 156 p.</li>
                    <li style="color:#454545;">M. Romieu, A. Bianchi, <i>Gramatica d'Occitan Gascon Contemporanèu</i>, Pessac : ed. Presses Universitaires de Bordeaux, Coll. Saber : Lenga, 2005, 523 p., bilingue occitan-français</li>
                    <li style="color:#454545;">J. Bouzet, <i>Manuel de grammaire béarnaise</i>, 2<sup>da</sup> edicion especiala per las escòlas, Pau : ed. Escòla Gaston Febus, 1975, 96 p.</li>
                    <li style="color:#454545;">J.P. Birabent, J. Salles-Loustau, <i>Mémento grammatical du Gascon</i>, Pau : Escòla Gaston Febus : Nosauts de Bigòrra, 1989, 151 p.</li>
                    <li style="color:#454545;">A. Hourcade, <i>Grammaire béarnaise</i>, Pau : ed. Los Caminaires, 1986, 360 p.</li>
                    <li style="color:#454545;">R. Darrigrand, <i>Initiation au gascon</i>, 3<sup>na</sup> edicion, Orthez : ed. Per Noste, 2012, 280 p.</li>
                    <li style="color:#454545;">M. Grosclaude, G. Narioo, <i>Répertoire des conjugaisons occitanes de Gascogne</i>, Orthez : Per Noste, Pau : La Civada, 1999, coll. Utís, 159 p.</li>
                    <li style="color:#454545;">P. Sauzet, J. Ubaud, <i>Le Verbe Occitan / Lo Vèrb Occitan, guide complet de conjugaison selon les parlers languedociens</i>, Edisud, Aix-en-Provence, 1995, 231 p.</li>
                    <li style="color:#454545;"><i>Atlas linguistique et ethnographique de la Gascogne</i>, jos la direccion de J. Ségu-, tome V (verbe), fasc. 1, cartes 1609-2065, Paris : CNRS, 1954-1973</li>
                  </ul>
                    <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugador occitan provençal</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Lo conjugador automatic en occitan provençal es una òbra normativa del Congrès. S'inscriu dins lo perlongament de la classificacion dels vèrbes en occitan lengadocian de Patric Sauzet e dels trabalhs descriptius e normatius anteriors : <i>Conjugaison occitane, savoir conjuguer en occitan (languedocien)</i> de Patric Sauzet, <i>Gramatica provençala</i> de G. Martin e Bernat Molin, <i>Tresor dòu Felibrige</i> de Frédéric Mistral, <i>Lo Vèrb Occitan</i> de Patric Sauzet e Josiana Ubaud, <i>Los vèrbs conjugats</i> de Partici Pojada,  <i>Las Preconizacions del Conselh de la lenga occitana</i>, òbra collectiva mesa en forma per Domergue Sumien.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Direccion scientifica&nbsp;:</b> Bernat Molin.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classament dels vèrbes, sistèma de modèles&nbsp;:</b> F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Relectura e correccions&nbsp;:</b> Bernat Molin.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Desvolopament e tractament de las donadas&nbsp;:</b> A. Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Fonts&nbsp;:</b></p>
                  <ul>
                    <li style="color:#454545;">E. Lèbre, G. Martin, B. Moulin, <i>Dictionnaire de base français-provençal</i>, Aix-en-Provence : CREO-Provença, difusion Edisud, 2<sup>na</sup> edicion, 2004, ISBN 2-7449-0521-6</li>
                    <li style="color:#454545;">G. Fettuciari, G. Martin, J. Pietri, <i>Dictionnaire provençal-français</i>, Aix-en-Provence : L’Escomessa CREO-Provença, difusion Edisud, 2003, 521 pages, SBN 2-7449-0464-3.</li>
                    <li style="color:#454545;">F. Mistral, <i>Trésor du Felibrige ou Dictionnaire Provençal-Français</i>, Genève-Paris : Slatkine, ed. de l'Unicorne, Paris-Genève, 1979, tome 1 A-F, 1200 p., tome II G-Z, 1170 p.</li>
                    <li style="color:#454545;">G. Martin, B. Moulin, <i>Grammaire provençale et atlas linguistique en couleur</i>, Aix-en-Provence : CREO-Provença-IEO, Calade difusion (Edisud), 2007, 196 pages, ISBN 978-2-95307-12-1-4</li>
                    <li style="color:#454545;">P. Sauzet, J. Ubaud, <i>Le Verbe Occitan / Lo Vèrb Occitan, guide complet de conjugaison selon les parlers languedociens</i>, Edisud, Aix-en-Provence, 1995, 231 pages</li>
                    <li style="color:#454545;">B. Giély, <i>Grammaire du verbe Provençal</i>, distribuït per Prouvènço d’aro, 1995, 702 p.</li>
                  </ul>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugador occitan lemosin</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Lo conjugador automatic en occitan lemosin es una òbra normativa del Congrès permanent de la lenga occitana. Foguèt fach dins lo perlongament de la classificacion dels vèrbes en occitan lengadocian de P. Sauzet, e dins la continüitat dels trabalhs descriptius e normatius anteriors : <i>Précis de Conjugaison occitane : dialecte limousin</i> de J. Roux e J.-L. Lévêque, <i>Dictionnaire normatif limousin-français</i> de G. Gonfroy, <i>Lo Vèrb occitan</i> de Patric Sauzet e Josiana Ubaud, <i>Los Vèrbs conjugats</i> de Partici Pojada, <i>Las Preconizacions del Conselh de la lenga occitana</i>, òbra collectiva mesa en forma per Domergue Sumien.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Direccion scientifica&nbsp;:</b> J.-L. Lévêque.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classament dels vèrbes, sistèma de modèles&nbsp;:</b> F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Relectura e correccions&nbsp;:</b> J.-L.- Lévêque.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Lexic dels vèrbes&nbsp;:</b> D. Chapduelh, F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Programacion, generacion de las conjugasons&nbsp;:</b> A. Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Fonts&nbsp;:</b></p>
                  <ul>
                    <li style="color:#454545;"><i>Diccionari francés-occitan lemosin</i> en linha sus la plataforma <i>Dicodòc</i> del Congrès</li>
                    <li style="color:#454545;"><i>Basic</i>, lexic elementari francés-occitan</li>
                    <li style="color:#454545;">G. Gonfroy, <i>Dictionnaire normatif limousin-français</i>, prefàcia de P. Bec e R. Joudoux, Tula : ed. Lemouzi, 1975, 229 p.</li>
                    <li style="color:#454545;">J. Roux ; J.-L. Lévêque, <i>Précis de Conjugaison occitane : dialecte limousin</i>, edicion revista e aumentada, Marçac d'Eila : Novelum-IEO Perigòrd, 94 p.</li>
                    <li style="color:#454545;">Lista de vèrbes lemosins establida per D. Chapduelh a partir dels diccionaris lengadocians consultables dins lo Dicodòc</li>
                    <li style="color:#454545;">A. Lanly, <i>Dictionnaire limousin français du parler de Chirac et de la Haute-Corrèze</i>, prefàcia, normalizacion grafica e nòtas de R. Joudoux, Tulle : revista <i>Lemouzi</i> n° 169 bis coll. Bernard de Vendadour, febrièr de 2004, 269 p.</li>
                    <li style="color:#454545;">Y. Lavalade, <i>Dictionnaire d'usage occitan/français</i>, Limousin, Marche, Périgord, Usercha : Institut d'Estudis Occitans dau Lemosin, 2010, 580 p.</li>
                    <li style="color:#454545;">Y. Lavalade, <i>Dictionnaire français/occitan</i>, Limousin, Marche, Périgord, Usercha : Institut d'Estudis Occitans dau Lemosin, 2010, 637 p.</li>
                    <li style="color:#454545;">R. Pagnoux, <i>Glossari Lemosin, contribucion a l'estudi de la linga lemosina</i>, Mas Seren : Institut d'Estudis Occitans dau Lemosin, Charreç : Terra d'Oc seccion occitana de R.A.C.I.N.E, 2005, 93 p.</li>
                    <li style="color:#454545;">J. Roux, <i>Vocabulari occitan-francés</i>, Novelum I.E.O Perigòrd</li>
                    <li style="color:#454545;">M. Tintou, <i>Dictionnaire français-limousin</i>, prefàcia de R. Joudoux : les mots et le patrimoine du Limousin, Tula : Lemouzi, 2006, 354 p.</li>
                    <li style="color:#454545;">F. Mistral, <i>Trésor du Felibrige ou Dictionnaire Provençal-Français</i>, Genève-Paris : Slatkine, ed. de l'Unicorne, Paris-Genève, 1979, tome 1 A-F, 1200 p., tome II G-Z, 1170 p.</li>
                    <li style="color:#454545;">L. Alibert, <i>Dictionnaire occitan-français selon les parlers languedociens</i>, Tolosa : I.E.O., 2016, 699 p.</li>
                    <li style="color:#454545;">J.P. Reydy, <i>Notre occitan : Le dialecte du Périgord-Limoiusin parlé dans le Parc naturel régional</i>, 2<sup>na</sup> ed. revisada e aumentada, Usercha : 2008, 239 p.</li>
                    <li style="color:#454545;">J. Roux, <i>Grammaire limousine, : La richesse du patrimoine linguistique du Limousin, ses formes populaires et littéraires</i>, prefàcia de R. Joudoux, n° especial de : <i>Lemouzi</i>, n° 196, 2010. - Fac-sim. de l'ed. de Tula : <i>Lemouzi</i>, 1895 ; Tula : Lemouzi, 2010, XXVIII-128 p.</li>
                    <li style="color:#454545;">M. Tintou, <i>Grammaire limousine</i>, prefàcia de R. Joudoux, 3a edicion, Tula : revista <i>Lemouzi</i> n° 85 bis, 1983, 126 p.</li>
                  </ul>
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Condicions d’utilizacion</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">L’utilizacion de l'aplicacion pels telefonets <i>Vèrb'Òc</i> es a gratis.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><i>Vèrb'Òc</i> es un conjugador automatic. Tal coma es, sos resultats son pas perfièches. Lo Congrès permanent de la lenga occitana es pas responsable de las errors de conjugason que se poirián produsir.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><i>Vèrb'Òc</i> es una aplicacion del Congrès permanent de la lenga occitana. Totes los dreches reservats.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Politica de confidencialitat</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">L’utilizacion de <i>Vèrb'Òc</i> se fa sens condicions d’inscripcion.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Cap de donada personala es pas recaptada pel Congrès quand utilizatz <i>Vèrb'Òc</i>.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Las solas donadas collectadas per <i>Vèrb'Òc</i> o son dins un objectiu estatistic, e son anonimizadas. Per cada utilizacion de l'aplicacion pels telefonets <i>Vèrb'Òc</i>, enregistram&nbsp;:</p>
                  <ul style="margin-top:0; margin-bottom:0; color:#454545;">
                  <li style="color:#454545;">La data e l’ora.</li>
                  <li style="color:#454545;">La varietat.</li>
                  <li style="color:#454545;">Lo vèrbe recercat.</li>
                  </ul>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Aquelas donadas demòran la proprietat del Congrès e son pas transmesas a de tèrces.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Qual sèm ?</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Lo Congrès permanent de la lenga occitana es l'organisme interregional de regulacion de l'occitan. Òbra dins los domenis de la lingüistica e del TAL (tractament automatic de la lenga).</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Produsís d’otisses lingüistics numerics de referéncia (diccionaris, conjugators, correctors ortografics...), d’aplicacions pel TAL (sintèsi vocala, traduccion automatica...) e d’aplicacions pels telefonets (clavièrs predictius...).</p>
                  <p style="margin-bottom:20; margin-top:8px; color:#454545;">Per ne saber mai sul Congrès&nbsp;: <a href="https://locongres.org" target="_blank" style="color: #43168c; text-decoration:none;">locongres.org</a>.</p>
                  `}}/>
                </ScrollView>

        </Layout>
  );
};





export default Credits;

const styles = StyleSheet.create({
  

  change_lang: {
    textAlign:'right',
    color:'#43168c',

  },
});
