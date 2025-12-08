// Components/Creditsfr.js

import Layout from '../Template/Layout';
import { StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import RenderHTMLSource from 'react-native-render-html';


import commonStyles from '../Template/commonStyles';


const Credits = function ({ navigation, route }) {




  return (

    <Layout>
                <ScrollView style={commonStyles.scrollView}>
                  <TouchableOpacity onPress={() => navigation.navigate('Informacions')}>
                    <Text style={styles.change_lang}>Legir en occitan</Text>
                  </TouchableOpacity>
                  <RenderHTMLSource source={{html: `
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Crédits</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b><i>Vèrb'Òc</i> - conjugueur automatique occitan</b> est une application informatique qui permet de trouver immédiatement la conjugaison de nombreux verbes occitans avec une grande commodité et rapidité d'utilisation.</p>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Application</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Développement application mobile et API&nbsp;:</b> Aure Séguier (<a href="https://locongres.org" target="_blank" style="color: #43168c; text-decoration:none;">Lo Congrès</a>)</p>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugueur occitan languedocien</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Le conjugueur en occitan languedocien est une œuvre normative du Congrès permanent de la langue occitane. Il a été fait dans la continuité des travaux descriptifs et normatifs occitanistes antérieurs : <i>Gramatica occitana</i> et <i>Dictionnaire Occitan-Français</i> de Louis Alibert (version numérique Josiane Ubaud, Patric Sauzet GIDILOC, extraction d’entrées Sergi Granièr), <i>Diccionari</i> de Christian Laux, <i>Lo Vèrb occitan</i> de Patric Sauzet et Josiane Ubaud, <i>Los Vèrbs conjugats</i> de Partice Poujade, <i>Las Preconizacions del Conselh de la lenga occitana</i>, œuvre collective mise en forme par Domergue Sumien, <i>Conjugaison occitane</i> de Patric Sauzet.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classement des verbes, système de modèles&nbsp;:</b> Patric Sauzet.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Lexique de verbes&nbsp;:</b> Patric Sauzet, Francés Pic, Sèrgi Granièr.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Développement&nbsp;:</b> Domenge Château-Annaud.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Intégration des modèles et de la base de données&nbsp;:</b> Aure Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Corrections&nbsp;:</b> Bernat Molin, Hervé Lieutard, Domergue Sumien, Jacme Taupiac, Domenge Château-Annaud, Cédric Valmary, Aure Séguier.</p>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugueur occitan gascon</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Le conjugueur automatique en occitan gascon est une œuvre normative du Congrès permanent de la langue occitane. Il a été fait dans le prolongement de la classification des verbes en occitan languedocien de P. Sauzet, et dans la continuité des travaux descriptifs et normatifs antérieurs : <i>Dictionnaire français-occitan (gascon)</i> de M. Grosclaude, G. Nariòo et P. Guilhèmjoan, <i>Fichas de gramatica d'occitan gascon normat</i> 1 d'A. Bianchi et A. Viaut, <i>Gramatica d'occitan gascon contemporanèu</i> de M. Romieu et A. Bianchi, <i>Lo Vèrb occitan</i> de Patric Sauzet et Josiane Ubaud, <i>Los Vèrbs conjugats</i> de Partice Poujade, <i>Las Preconizacions del Conselh de la lenga occitana</i>, œuvre collective mise en forme par Domergue Sumien.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Direction scientifique&nbsp;:</b> M. Romieu, A. Bianchi.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classement des verbes, système de modèles&nbsp;:</b> F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Lexique des verbes&nbsp;:</b> A. Bianchi (à partir des travaux d'E. Astier et G. Nariòo).</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Relecture et corrections&nbsp;:</b> M. Romieu, A. Bianchi.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Développement et traitement des données&nbsp;:</b> A. Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Remerciements&nbsp;:</b> A. Viaut.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Sources&nbsp;:</b></p>
                  <ul>
                    <li style="color:#454545;">F. Mistral, <i>Trésor du Felibrige ou Dictionnaire Provençal-Français</i>, Genève-Paris : Slatkine, ed. de l'Unicorne, Paris-Genève, 1979, tome 1 A-F, 1200 p., tome II G-Z, 1170 p.</li>
                    <li style="color:#454545;">N. Rey Bèthvéder, <i>Dictionnaire français / occitan, (gascon toulousain)</i>, Puylaurens : ed. I.E.O., 2004, 309 p.</li>
                    <li style="color:#454545;">S. Palay, <i>Dictionnaire du béarnais et du gascon modernes</i>, Paris : CNRS, 1991</li>
                    <li style="color:#454545;">M Grosclaude, G. Narioo, P. Guilhemjoan, <i>Dictionnaire français-occitan (gascon)</i>, 2 vol., ed. Per Noste, 2004</li>
                    <li style="color:#454545;">V. Lespy, P. Raymond, <i>Dictionnaire béarnais ancien et moderne</i>, nouvelle édition revue et corrigée par J. Lafitte, Belin-Béliet : ed. Princi negre, 1998, 613 p.</li>
                    <li style="color:#454545;">A. Bianchi, A. Viaut, <i>Fichas de Gramatica d'Occitan Gascon Normat</i> 1, Talence : Presses Universitaires de Bordeaux, coll. : Images, 1995, 156 p.</li>
                    <li style="color:#454545;">M. Romieu, A. Bianchi, <i>Gramatica d'Occitan Gascon Contemporanèu</i>, Pessac : ed. Presses Universitaires de Bordeaux, Coll. Saber : Lenga, 2005, 523 p., bilingue occitan-français</li>
                    <li style="color:#454545;">J. Bouzet, <i>Manuel de grammaire béarnaise</i>, 2<sup>e</sup> édition spéciale pour les écoles, Pau : ed. Escòla Gaston Febus, 1975, 96 p.</li>
                    <li style="color:#454545;">J.P. Birabent, J. Salles-Loustau, <i>Mémento grammatical du Gascon</i>, Pau : Escòla Gaston Febus : Nosauts de Bigòrra, 1989, 151 p.</li>
                    <li style="color:#454545;">A. Hourcade, <i>Grammaire béarnaise</i>, Pau : ed. Los Caminaires, 1986, 360 p.</li>
                    <li style="color:#454545;">R. Darrigrand, <i>Initiation au gascon</i>, 3<sup>e</sup> édition, Orthez : ed. Per Noste, 2012, 280 p.</li>
                    <li style="color:#454545;">M. Grosclaude, G. Narioo, <i>Répertoire des conjugaisons occitanes de Gascogne</i>, Orthez : Per Noste, Pau : La Civada, 1999, coll. Utís, 159 p.</li>
                    <li style="color:#454545;">P. Sauzet, J. Ubaud, <i>Le Verbe Occitan / Lo Vèrb Occitan, guide complet de conjugaison selon les parlers languedociens</i>, Edisud, Aix-en-Provence, 1995, 231 p.</li>
                    <li style="color:#454545;"><i>Atlas linguistique et ethnographique de la Gascogne</i>, sous la direction de J. Ségu-, tome V (verbe), fasc. 1, cartes 1609-2065, Paris : CNRS, 1954-1973</li>
                  </ul>
                    <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugueur occitan provençal</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Le conjugueur automatique en occitan provençal est une œuvre normative du Congrès permanent de la langue occitane. Il s'inscrit dans le prolongement de la classification des verbes en occitan languedocien de Patric Sauzet et des travaux descriptifs et normatifs antérieurs : <i>Conjugaison occitane, savoir conjuguer en occitan (languedocien)</i> de Patric Sauzet, <i>Gramatica provençala</i> de G. Martin et Bernat Molin, <i>Tresor dòu Felibrige</i> de Frédéric Mistral, <i>Lo Vèrb Occitan</i> de Patric Sauzet et Josiane Ubaud, <i>Los vèrbs conjugats</i> de Partice Poujade, <i>Las Preconizacions del Conselh de la lenga occitana</i>, œuvre collective mise en forme par Domergue Sumien.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Direction scientifique&nbsp;:</b> Bernat Molin.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classement des verbes, système de modèles&nbsp;:</b> F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Relecture et corrections&nbsp;:</b> Bernat Molin.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Développement et traitement des données&nbsp;:</b> A. Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Sources&nbsp;:</b></p>
                  <ul>
                    <li style="color:#454545;">E. Lèbre, G. Martin, B. Moulin, <i>Dictionnaire de base français-provençal</i>, Aix-en-Provence : CREO-Provença, diffusion Edisud, 2<sup>e</sup> édition, 2004, ISBN 2-7449-0521-6</li>
                    <li style="color:#454545;">G. Fettuciari, G. Martin, J. Pietri, <i>Dictionnaire provençal-français</i>, Aix-en-Provence : L’Escomessa CREO-Provença, diffusion Edisud, 2003, 521 pages, SBN 2-7449-0464-3.</li>
                    <li style="color:#454545;">F. Mistral, <i>Trésor du Felibrige ou Dictionnaire Provençal-Français</i>, Genève-Paris : Slatkine, ed. de l'Unicorne, Paris-Genève, 1979, tome 1 A-F, 1200 p., tome II G-Z, 1170 p.</li>
                    <li style="color:#454545;">G. Martin, B. Moulin, <i>Grammaire provençale et atlas linguistique en couleur</i>, Aix-en-Provence : CREO-Provença-IEO, Calade diffusion (Edisud), 2007, 196 pages, ISBN 978-2-95307-12-1-4</li>
                    <li style="color:#454545;">P. Sauzet, J. Ubaud, <i>Le Verbe Occitan / Lo Vèrb Occitan, guide complet de conjugaison selon les parlers languedociens</i>, Edisud, Aix-en-Provence, 1995, 231 pages</li>
                    <li style="color:#454545;">B. Giély, <i>Grammaire du verbe Provençal</i>, distribué par Prouvènço d’aro, 1995, 702 p.</li>
                  </ul>
                  <p style="margin-bottom:0; margin-top:12px; color:#43168c;font-size:15px; font-weight:bold;">Conjugueur occitan limousin</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Le conjugueur automatique en occitan limousin est une œuvre normative du Congrès permanent de la langue occitane. Il a été fait dans le prolongement de la classification des verbes en occitan languedocien de P. Sauzet, et dans la continuité des travaux descriptifs et normatifs antérieurs : <i>Précis de Conjugaison occitane : dialecte limousin</i> de J. Roux et J.-L. Lévêque, <i>Dictionnaire normatif limousin-français</i> de G. Gonfroy, <i>Lo Vèrb occitan</i> de Patric Sauzet et Josiane Ubaud, <i>Los Vèrbs conjugats</i> de Partice Poujade, <i>Las Preconizacions del Conselh de la lenga occitana</i>, œuvre collective mise en forme par Domergue Sumien.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Direction scientifique&nbsp;:</b> J.-L. Lévêque.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Classement des verbes, système de modèles&nbsp;:</b> F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Relecture et corrections&nbsp;:</b> J.-L.- Lévêque.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Lexique des verbes&nbsp;:</b> D. Chapduelh, F. Marcouyre.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Programmation, génération des conjugaisons&nbsp;:</b> A. Séguier.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><b>Sources&nbsp;:</b></p>
                  <ul>
                    <li style="color:#454545;"><i>Diccionari francés-occitan lemosin</i> en ligne sur la plateforme <i>Dicodòc</i> du Congrès</li>
                    <li style="color:#454545;"><i>Basic</i>, lexique élémentaire français-occitan</li>
                    <li style="color:#454545;">G. Gonfroy, <i>Dictionnaire normatif limousin-français</i>, préface de P. Bec et R. Joudoux, Tula : ed. Lemouzi, 1975, 229 p.</li>
                    <li style="color:#454545;">J. Roux ; J.-L. Lévêque, <i>Précis de Conjugaison occitane : dialecte limousin</i>, édition revue et augmentée, Marçac d'Eila : Novelum-IEO Perigòrd, 94 p.</li>
                    <li style="color:#454545;">Liste de verbes limousins établie par D. Chapduelh à partir des dictionnaires languedociens consultables dans le Dicodòc</li>
                    <li style="color:#454545;">A. Lanly, <i>Dictionnaire limousin français du parler de Chirac et de la Haute-Corrèze</i>, préface, normalisation graphique et notes de R. Joudoux, Tulle : revue <i>Lemouzi</i> n° 169 bis coll. Bernard de Vendadour, février 2004, 269 p.</li>
                    <li style="color:#454545;">Y. Lavalade, <i>Dictionnaire d'usage occitan/français</i>, Limousin, Marche, Périgord, Usercha : Institut d'Estudis Occitans dau Lemosin, 2010, 580 p.</li>
                    <li style="color:#454545;">Y. Lavalade, <i>Dictionnaire français/occitan</i>, Limousin, Marche, Périgord, Usercha : Institut d'Estudis Occitans dau Lemosin, 2010, 637 p.</li>
                    <li style="color:#454545;">R. Pagnoux, <i>Glossari Lemosin, contribucion a l'estudi de la linga lemosina</i>, Mas Seren : Institut d'Estudis Occitans dau Lemosin, Charreç : Terra d'Oc seccion occitana de R.A.C.I.N.E, 2005, 93 p.</li>
                    <li style="color:#454545;">J. Roux, <i>Vocabulari occitan-francés</i>, Novelum I.E.O Perigòrd</li>
                    <li style="color:#454545;">M. Tintou, <i>Dictionnaire français-limousin</i>, préface de R. Joudoux : les mots et le patrimoine du Limousin, Tula : Lemouzi, 2006, 354 p.</li>
                    <li style="color:#454545;">F. Mistral, <i>Trésor du Felibrige ou Dictionnaire Provençal-Français</i>, Genève-Paris : Slatkine, ed. de l'Unicorne, Paris-Genève, 1979, tome 1 A-F, 1200 p., tome II G-Z, 1170 p.</li>
                    <li style="color:#454545;">L. Alibert, <i>Dictionnaire occitan-français selon les parlers languedociens</i>, Toulouse : I.E.O., 2016, 699 p.</li>
                    <li style="color:#454545;">J.P. Reydy, <i>Notre occitan : Le dialecte du Périgord-Limoiusin parlé dans le Parc naturel régional</i>, 2<sup>e</sup> ed. révisée et augmentée, Usercha : 2008, 239 p.</li>
                    <li style="color:#454545;">J. Roux, <i>Grammaire limousine, : La richesse du patrimoine linguistique du Limousin, ses formes populaires et littéraires</i>, préface de R. Joudoux, n° spécial de : <i>Lemouzi</i>, n° 196, 2010. - Fac-sim. de l'ed. de Tulle : <i>Lemouzi</i>, 1895 ; Tulle : Lemouzi, 2010, XXVIII-128 p.</li>
                    <li style="color:#454545;">M. Tintou, <i>Grammaire limousine</i>, préface de R. Joudoux, 3e édition, Tulle : revue <i>Lemouzi</i> n° 85 bis, 1983, 126 p.</li>
                  </ul>
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Conditions d’utilisation</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">L'utilisation de l'application mobile <i>Vèrb'Òc</i> est gratuite.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><i>Vèrb'Òc</i> est un conjugueur automatique. En l'état, ses résultats ne sont pas parfaits. Le Congrès permanent de la langue occitane n'est pas responsable des erreurs de conjugaison qui pourraient se produire.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;"><i>Vèrb'Òc</i> est une application du Congrès permanent de la langue occitane. Tous droits réservés.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Politique de confidentialité</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">L’utilisation de <i>Vèrb'Òc</i> se fait sans conditions d'inscription.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Aucune donnée personnelle n'est collectée par le Congrès quand vous utilisez <i>Vèrb'Òc</i>.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Les seules données collectées par <i>Vèrb'Òc</i> le sont dans un objectif statistique et elles sont anonymisées. Pour chaque utilisation de l'application mobile <i>Vèrb'Òc</i>, nous enregistrons&nbsp;:</p>
                  <ul style="margin-top:0; margin-bottom:0; color:#454545;">
                  <li style="color:#454545;">La date et l'heure.</li>
                  <li style="color:#454545;">La variété.</li>
                  <li style="color:#454545;">Le verbe recherché.</li>
                  </ul>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Ces données restent la propriété du Congrès et ne sont pas transmises à des tiers.</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#43168c;font-size:18px; font-weight:bold;">Qui sommes-nous ?</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Le Congrès permanent de la langue occitane est l'organisme interrégional de régulation de l'occitan. Il œuvre dans les domaines de la linguistique et du TAL (traitement automatique de la langue).</p>
                  <p style="margin-bottom:0; margin-top:8px; color:#454545;">Il produit des outils linguistiques numériques de référence (dictionnaires, conjugueurs, correcteurs orthographiques...) et des applications mobiles (claviers prédictifs...).</p>
                  <p style="margin-bottom:20; margin-top:8px; color:#454545;">Pour en savoir plus sur le Congrès&nbsp;: <a href="https://locongres.org" target="_blank" style="color: #43168c; text-decoration:none;">locongres.org</a>.</p>
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
