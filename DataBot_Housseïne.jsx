import { useState, useRef, useEffect } from "react";

const PHOTO_B64 = "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";

const PROFIL = {
  nom: "TCHATAKOURA Housseïne",
  titre: "Data Scientist & Spécialiste Suivi-Évaluation",
  sous_titre: "Agroéconomie | IBM Certified",
  email: "tchatakourah@gmail.com",
  tel: "+228 91 40 56 52",
  location: "Kara, Togo",
  linkedin: "linkedin.com/in/housseine-tchatakoura-a25a6a334",
  github: "github.com/tchatakourah-hash",
  langues: ["Français (Avancé)", "Anglais (Intermédiaire)", "Ewe (Avancé)", "Kabyè (Intermédiaire)"],
  competences: [
    { label: "Python (Pandas, NumPy, Matplotlib)", niveau: 95 },
    { label: "Machine Learning & Scikit-learn", niveau: 90 },
    { label: "Data Viz & Dashboarding (Plotly Dash)", niveau: 92 },
    { label: "SQL & Bases de données", niveau: 85 },
    { label: "SIG & Cartographie (Folium)", niveau: 88 },
    { label: "SPSS & STATA", niveau: 80 },
    { label: "Suivi-Évaluation (EIDM)", niveau: 90 },
    { label: "KoboToolbox (collecte terrain)", niveau: 85 },
  ],
  experiences: [
    { poste: "Data Scientist Junior", org: "IBM – Coursera", periode: "04/2026", desc: "Modèles ML, dashboards interactifs, analyses socio-économiques agricoles." },
    { poste: "Stagiaire en Agroéconomie", org: "ONG RAFIA – Dapaong, Togo", periode: "11/2023 – 12/2024", desc: "Étude des mécanismes de financement PROSAD. Collecte & analyse terrain." },
  ],
  formations: [
    { titre: "Certificat Professionnel en Data Science", org: "IBM – Coursera", periode: "05/2026" },
    { titre: "Master Suivi-Évaluation des Projets", org: "FSEG – Kara, Togo", periode: "11/2025 – présent" },
    { titre: "Licence en Socio-économie Rurale", org: "ESA – Université de Lomé", periode: "10/2020 – 12/2024" },
  ],
  projets: [
    { nom: "Dashboard Climat Togo", lien: "dashboard-climat-togo-sgrnmrhqkndqnrr5mbvxkh.streamlit.app" },
    { nom: "Dashboard Impact Togo", lien: "dashboard-impact-togo-cmtr4gtqex5y7nydfmgsk.streamlit.app" },
  ]
};

const SYSTEM_PROMPT = `Tu es DataBot Pro, assistant Data Scientist expert de TCHATAKOURA Housseïne, Agroéconomiste & Data Scientist certifié IBM, basé à Kara, Togo.

## VOLETS D'ANALYSE
1. DESCRIPTIF: Stats, EDA, distributions, tendances
2. DIAGNOSTIC: Corrélations, tests statistiques, causes
3. PRÉDICTIF: Régression, classification, clustering, séries temporelles
4. PRESCRIPTIF: Optimisation, scénarios, recommandations, ROI
5. DATA VIZ & DASHBOARD: Matplotlib, Seaborn, Plotly, Dash
6. SIG & CARTOGRAPHIE: Folium, GeoPandas, cartes choroplèthes

## RÈGLES
- Réponds TOUJOURS en français
- Identifie automatiquement le type d'étude selon la problématique
- Fournis des squelettes de code Python complets et prêts à l'emploi
- Propose toujours une structure de rapport final
- Sois précis, structuré, professionnel`;

const VOLETS = [
  { id: "descriptif", emoji: "📊", label: "Analyse Descriptive", color: "#3b82f6", desc: "Stats, EDA, distributions" },
  { id: "diagnostic", emoji: "🔍", label: "Analyse Diagnostique", color: "#8b5cf6", desc: "Corrélations, tests stat" },
  { id: "predictif", emoji: "🤖", label: "Modélisation Prédictive", color: "#10b981", desc: "ML, régression, classification" },
  { id: "prescriptif", emoji: "💡", label: "Analyse Prescriptive", color: "#f59e0b", desc: "Scénarios, recommandations" },
  { id: "viz", emoji: "📈", label: "Data Viz & Dashboard", color: "#ef4444", desc: "Matplotlib, Plotly, Dash" },
  { id: "sig", emoji: "🗺️", label: "SIG & Cartographie", color: "#06b6d4", desc: "Folium, choroplèthes" },
];

const SQUELETTES = {
  descriptif: {
    title: "📊 Analyse Descriptive & EDA",
    steps: [
      { num:"01", title:"Import & Chargement", code:`import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Chargement\ndf = pd.read_csv('data.csv')\nprint(df.shape)\ndf.head()` },
      { num:"02", title:"Compréhension des données", code:`df.info()\ndf.dtypes\ndf.describe(include='all')\ndf.isnull().sum()\ndf.isnull().mean() * 100` },
      { num:"03", title:"Nettoyage & Wrangling", code:`df['col'].fillna(df['col'].mean(), inplace=True)\ndf['col'] = pd.to_numeric(df['col'], errors='coerce')\ndf.drop_duplicates(inplace=True)\ndf['col_norm'] = (df['col'] - df['col'].min()) / (df['col'].max() - df['col'].min())` },
      { num:"04", title:"Distributions & Visualisation", code:`fig, axes = plt.subplots(2, 2, figsize=(12, 8))\ndf['col'].hist(ax=axes[0,0], bins=30, color='steelblue')\ndf.boxplot(column='col', ax=axes[0,1])\nsns.countplot(x='cat_col', data=df, ax=axes[1,0])\nsns.heatmap(df.corr(), annot=True, ax=axes[1,1])\nplt.tight_layout(); plt.show()` },
      { num:"05", title:"GroupBy & Agrégation", code:`result = df.groupby('cat')['val'].agg(['mean','median','std','count'])\npivot = df.pivot_table(values='val', index='cat1', columns='cat2', aggfunc='mean')\nsns.heatmap(pivot, annot=True, fmt='.1f')` },
    ],
    rapport:`# Structure Rapport – Analyse Descriptive\n1. Résumé Exécutif (~200 mots)\n2. Contexte & Objectifs\n3. Source & Description des Données\n   - Dimensions, types, qualité (% manquants)\n4. Analyse Statistique\n   - Stats descriptives, distributions, outliers\n5. Visualisations & Insights\n6. Conclusion & Recommandations`
  },
  diagnostic: {
    title: "🔍 Analyse Diagnostique",
    steps: [
      { num:"01", title:"Corrélations & Relations", code:`import scipy.stats as stats\ncorr_matrix = df.corr()\nprint(corr_matrix['target'].sort_values(ascending=False))\ncorr, p_value = stats.pearsonr(df['var1'], df['var2'])\nprint(f"Corr: {corr:.3f}, p-value: {p_value:.4f}")` },
      { num:"02", title:"Tests statistiques", code:`# ANOVA\nf_stat, p_val = stats.f_oneway(groupe_a, groupe_b)\nprint(f"F={f_stat:.3f}, p={p_val:.4f}")\n\n# Chi²\ncontingency = pd.crosstab(df['cat1'], df['cat2'])\nchi2, p, dof, expected = stats.chi2_contingency(contingency)` },
      { num:"03", title:"Analyse des Outliers", code:`from scipy import stats\nz_scores = np.abs(stats.zscore(df['col']))\noutliers = df[z_scores > 3]\nQ1, Q3 = df['col'].quantile(0.25), df['col'].quantile(0.75)\nIQR = Q3 - Q1\noutliers_iqr = df[(df['col'] < Q1-1.5*IQR) | (df['col'] > Q3+1.5*IQR)]` },
      { num:"04", title:"Régression OLS", code:`import statsmodels.api as sm\nX_sm = sm.add_constant(X)\nmodele = sm.OLS(y, X_sm).fit()\nprint(modele.summary())\nprint(f"R²: {modele.rsquared:.3f}")` },
      { num:"05", title:"Visualisation diagnostique", code:`sns.regplot(x='feature', y='target', data=df, ci=95)\nsns.pairplot(df[['var1','var2','var3','target']])\nplt.show()` },
    ],
    rapport:`# Structure Rapport – Analyse Diagnostique\n1. Question Diagnostique posée\n2. Méthodologie (tests utilisés, seuil α=0.05)\n3. Corrélations significatives\n4. Tests d'hypothèse (H0/H1)\n5. Facteurs explicatifs identifiés\n6. Interprétation causale\n7. Recommandations`
  },
  predictif: {
    title: "🤖 Modélisation Prédictive ML",
    steps: [
      { num:"01", title:"Préparation des données", code:`from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\nX = df.drop('target', axis=1)\ny = df['target']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)\nX_test = scaler.transform(X_test)` },
      { num:"02", title:"Entraînement du modèle", code:`from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.linear_model import LinearRegression, LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.neighbors import KNeighborsClassifier\n\nmodele = RandomForestClassifier(n_estimators=100, random_state=42)\nmodele.fit(X_train, y_train)\ny_pred = modele.predict(X_test)` },
      { num:"03", title:"Évaluation", code:`from sklearn.metrics import r2_score, mean_squared_error, accuracy_score, classification_report\nprint(f"R²: {r2_score(y_test, y_pred):.4f}")\nprint(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}")\nprint(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")\nprint(classification_report(y_test, y_pred))` },
      { num:"04", title:"Clustering K-Means", code:`from sklearn.cluster import KMeans\ninertias = [KMeans(n_clusters=k, random_state=42).fit(X_train).inertia_ for k in range(1,11)]\nplt.plot(range(1,11), inertias, 'bx-'); plt.title('Elbow'); plt.show()\nkm = KMeans(n_clusters=3, random_state=42)\ndf['cluster'] = km.fit_predict(X_train)` },
      { num:"05", title:"Pipeline & GridSearch", code:`from sklearn.pipeline import Pipeline\nfrom sklearn.model_selection import GridSearchCV\npipeline = Pipeline([('scaler', StandardScaler()), ('model', RandomForestClassifier())])\nparam_grid = {'model__n_estimators':[50,100,200], 'model__max_depth':[None,5,10]}\ngrid = GridSearchCV(pipeline, param_grid, cv=5, scoring='accuracy', n_jobs=-1)\ngrid.fit(X_train, y_train)\nprint(f"Best: {grid.best_params_} | Score: {grid.best_score_:.4f}")` },
    ],
    rapport:`# Structure Rapport – Modélisation Prédictive\n1. Objectif de prédiction (variable cible, type)\n2. Données & Prétraitement\n3. Modèles testés & Comparaison (tableau R², F1, RMSE)\n4. Meilleur modèle & Paramètres optimaux\n5. Résultats & Prédictions\n6. Limitations & Améliorations futures`
  },
  viz: {
    title: "📈 Data Viz & Dashboard",
    steps: [
      { num:"01", title:"Matplotlib – Graphiques", code:`fig, axes = plt.subplots(1, 3, figsize=(15, 5))\naxes[0].plot(df['date'], df['valeur'], 'b-', linewidth=2)\ndf.groupby('cat')['val'].sum().plot(kind='bar', ax=axes[1])\naxes[2].scatter(df['x'], df['y'], c=df['group'].astype('category').cat.codes)\nplt.tight_layout(); plt.savefig('viz.png', dpi=150)` },
      { num:"02", title:"Seaborn – Avancé", code:`sns.set_theme(style='whitegrid')\nfig, axes = plt.subplots(2, 2, figsize=(12,10))\nsns.histplot(df['col'], kde=True, ax=axes[0,0])\nsns.boxplot(x='group', y='val', data=df, ax=axes[0,1])\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm', ax=axes[1,0])\nsns.regplot(x='x', y='y', data=df, ci=95, ax=axes[1,1])` },
      { num:"03", title:"Plotly – Interactif", code:`import plotly.express as px\nfig = px.scatter(df, x='var1', y='var2', color='cat', size='val', title='Analyse')\nfig.show()\nfig2 = px.bar(df, x='cat', y='val', color='group', animation_frame='annee')\nfig2.show()` },
      { num:"04", title:"Folium – Cartographie", code:`import folium\nfrom folium.plugins import MarkerCluster\ncarte = folium.Map(location=[df.lat.mean(), df.lon.mean()], zoom_start=10)\nmc = MarkerCluster().add_to(carte)\nfor _, r in df.iterrows():\n    folium.Marker([r.lat, r.lon], popup=r.nom).add_to(mc)\ncarte.save('carte.html')` },
      { num:"05", title:"Dash – Dashboard", code:`from dash import Dash, dcc, html, Input, Output\napp = Dash(__name__)\napp.layout = html.Div([\n    html.H1('Dashboard'),\n    dcc.Dropdown(id='dd', options=[{'label':c,'value':c} for c in df.cat.unique()]),\n    dcc.Graph(id='graph')\n])\n@app.callback(Output('graph','figure'), Input('dd','value'))\ndef update(val):\n    return px.line(df[df.cat==val], x='date', y='valeur')\napp.run(debug=True)` },
    ],
    rapport:`# Structure Rapport – Visualisation\n1. Objectif de communication visuelle\n2. Choix des visualisations (justification)\n3. Graphiques clés (distribution, tendances, comparaisons)\n4. Dashboard interactif (capture/lien)\n5. Insights visuels\n6. Recommandations`
  },
  sig: {
    title: "🗺️ SIG & Cartographie",
    steps: [
      { num:"01", title:"Carte interactive Folium", code:`import folium\ncarte = folium.Map(location=[lat_moy, lon_moy], zoom_start=8, tiles='CartoDB positron')\nfor _, r in df.iterrows():\n    folium.CircleMarker([r.lat, r.lon], radius=r.val/100,\n        color='red', fill=True,\n        popup=f"{r.nom}: {r.val}").add_to(carte)\ncarte.save('carte.html')` },
      { num:"02", title:"GeoPandas – Analyse spatiale", code:`import geopandas as gpd\ngdf = gpd.read_file('regions.shp')\ngdf = gdf.merge(df, on='region')\nfig, ax = plt.subplots(figsize=(12,8))\ngdf.plot(column='valeur', cmap='YlOrRd', legend=True, ax=ax)\nax.set_title('Distribution spatiale'); ax.axis('off')` },
      { num:"03", title:"Choroplèthe Folium", code:`folium.Choropleth(\n    geo_data=geo_json, name='choroplèthe',\n    data=df, columns=['Region','Valeur'],\n    key_on='feature.properties.name',\n    fill_color='YlOrRd', legend_name='Indicateur'\n).add_to(carte)\nfolium.LayerControl().add_to(carte)\ncarte.save('choropleth.html')` },
      { num:"04", title:"Heatmap spatiale", code:`from folium.plugins import HeatMap\nheat_data = df[['lat','lon','val']].values.tolist()\nHeatMap(heat_data, radius=15, blur=10).add_to(carte)\ncarte.save('heatmap.html')` },
      { num:"05", title:"Clustering spatial", code:`from sklearn.cluster import KMeans\ncoords = df[['lat','lon']].values\ndf['zone'] = KMeans(n_clusters=5, random_state=42).fit_predict(coords)\ncarte = folium.Map(location=[coords[:,0].mean(), coords[:,1].mean()], zoom_start=7)\ncolors = ['red','blue','green','orange','purple']\nfor _, r in df.iterrows():\n    folium.CircleMarker([r.lat, r.lon], color=colors[r.zone], fill=True).add_to(carte)` },
    ],
    rapport:`# Structure Rapport – SIG & Cartographie\n1. Contexte géographique\n2. Sources de données spatiales\n3. Méthodologie cartographique\n4. Cartes & Analyses spatiales\n5. Patterns géographiques identifiés\n6. Recommandations territoriales`
  },
  prescriptif: {
    title: "💡 Analyse Prescriptive",
    steps: [
      { num:"01", title:"Segmentation & Profiling", code:`from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(df[features])\ndf['segment'] = KMeans(n_clusters=4, random_state=42).fit_predict(X_scaled)\nprofile = df.groupby('segment')[features].mean()\nprint(profile)` },
      { num:"02", title:"Analyse What-If / Scénarios", code:`def simuler_scenario(df, param, nouvelle_val, modele):\n    df_sim = df.copy()\n    df_sim[param] = nouvelle_val\n    delta = modele.predict(df_sim[features]) - modele.predict(df[features])\n    return {'impact_moyen': delta.mean(), 'impact_total': delta.sum()}\nresultat = simuler_scenario(df, 'prix', df['prix']*1.10, modele)\nprint(resultat)` },
      { num:"03", title:"Importance des variables", code:`from sklearn.ensemble import RandomForestRegressor\nrf = RandomForestRegressor(n_estimators=100, random_state=42).fit(X_train, y_train)\nimportances = pd.Series(rf.feature_importances_, index=features)\nimportances.sort_values().plot(kind='barh', figsize=(10,6), color='teal')\nplt.title('Importance des variables'); plt.show()` },
      { num:"04", title:"Recommandations automatiques", code:`def generer_reco(row, modele, seuil_haut=0.7, seuil_moyen=0.4):\n    score = modele.predict_proba([row[features]])[0][1]\n    if score > seuil_haut: return 'Action prioritaire'\n    elif score > seuil_moyen: return 'Action secondaire'\n    else: return 'Surveillance'\ndf['recommandation'] = df.apply(generer_reco, axis=1, args=(modele,))\nprint(df['recommandation'].value_counts())` },
      { num:"05", title:"Calcul ROI", code:`def calculer_roi(df, modele, cout_action, gain_par_conversion):\n    df['proba'] = modele.predict_proba(df[features])[:,1]\n    df['action'] = df['proba'] > 0.5\n    gain = (df[df['action']]['proba']).sum() * gain_par_conversion\n    cout = df['action'].sum() * cout_action\n    return {'ROI': f"{(gain-cout)/cout*100:.1f}%", 'Gain_net': gain-cout}\nprint(calculer_roi(df, modele, 50, 200))` },
    ],
    rapport:`# Structure Rapport – Prescriptif\n1. Contexte décisionnel\n2. Synthèse prédictive\n3. Scénarios (optimiste / réaliste / pessimiste)\n4. Recommandations priorisées\n5. ROI estimé & KPIs de suivi\n6. Plan d'implémentation`
  }
};

const METHODO = [
  { step:"01", icon:"🎯", titre:"Compréhension Business", desc:"Quel problème ? Quels objectifs ? KPIs ?" },
  { step:"02", icon:"🧭", titre:"Approche Analytique", desc:"Descriptif / Diagnostic / Prédictif / Prescriptif ?" },
  { step:"03", icon:"📋", titre:"Exigences de Données", desc:"Quelles données ? Quelles sources ?" },
  { step:"04", icon:"🗄️", titre:"Collecte des Données", desc:"API, CSV, SQL, Web scraping, terrain" },
  { step:"05", icon:"👁️", titre:"Compréhension des Données", desc:"Types, distributions, qualité des données" },
  { step:"06", icon:"🔧", titre:"Préparation des Données", desc:"Nettoyage, wrangling, feature engineering" },
  { step:"07", icon:"⚙️", titre:"Modélisation", desc:"Choix algorithme, entraînement, tuning" },
  { step:"08", icon:"✅", titre:"Évaluation", desc:"R², accuracy, F1, RMSE, validation croisée" },
  { step:"09", icon:"🚀", titre:"Déploiement", desc:"Dashboard, API, rapport final, Streamlit" },
  { step:"10", icon:"🔄", titre:"Feedback & Amélioration", desc:"Itérations, nouvelles données, monitoring" },
];

export default function DataBotPro() {
  const [activeTab, setActiveTab] = useState("profil");
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"👋 **Bienvenue sur DataBot Pro !**\n\nJe suis l'assistant Data Scientist de **TCHATAKOURA Housseïne**, Agroéconomiste & Data Scientist certifié IBM 🏆\n\nDécris-moi ton problème ou clique sur un volet pour commencer !"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedVolet, setSelectedVolet] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [copied, setCopied] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const messagesEnd = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  const callClaude = async (userMsg) => {
    setLoading(true);
    try {
      const hist = messages.map(m => ({role:m.role, content:m.content}));
      hist.push({role:"user", content:userMsg});
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({model:"claude-sonnet-4-6", max_tokens:1000, system:SYSTEM_PROMPT, messages:hist})
      });
      const data = await res.json();
      return data.content?.map(b=>b.text||"").join("") || "Erreur.";
    } catch(e) { return "❌ Erreur de connexion."; }
    finally { setLoading(false); }
  };

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(p=>[...p, {role:"user", content:msg}]);
    const rep = await callClaude(msg);
    setMessages(p=>[...p, {role:"assistant", content:rep}]);
    if (activeTab !== "chat") setActiveTab("chat");
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code.replace(/\\n/g,"\n"));
    setCopied(id); setTimeout(()=>setCopied(null), 2000);
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setUploadedFile(f.name);
    send(`J'ai importé le fichier "${f.name}" (.${f.name.split(".").pop()}). Donne-moi le code Python complet pour : 1) le charger, 2) comprendre sa structure, 3) faire une première analyse exploratoire.`);
  };

  const formatMsg = (content) => {
    return content.split(/(```[\s\S]*?```)/g).map((part, i) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```\w*\n?/,"").replace(/```$/,"");
        const id = `c${i}`;
        return (
          <div key={i} style={{position:"relative",margin:"8px 0"}}>
            <div style={{background:"#1e1e2e",borderRadius:"8px",padding:"12px 16px",fontFamily:"monospace",fontSize:"12px",color:"#cdd6f4",overflow:"auto",maxHeight:"260px",borderLeft:"3px solid #7c3aed"}}>
              <pre style={{margin:0,whiteSpace:"pre-wrap"}}>{code}</pre>
            </div>
            <button onClick={()=>copyCode(code,id)} style={{position:"absolute",top:"8px",right:"8px",background:copied===id?"#10b981":"#374151",color:"white",border:"none",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",cursor:"pointer"}}>
              {copied===id?"✓":"📋"}
            </button>
          </div>
        );
      }
      return <span key={i} style={{whiteSpace:"pre-wrap"}}>{part.split(/\*\*(.*?)\*\*/g).map((t,j)=>j%2===1?<strong key={j}>{t}</strong>:t)}</span>;
    });
  };

  const QUICK = [
    {l:"🔎 Identifier le type d'étude", m:"Comment identifier automatiquement le type d'analyse (descriptif, diagnostic, prédictif, prescriptif) selon la problématique ?"},
    {l:"📥 Charger des données", m:"Montre-moi comment charger et explorer rapidement des données avec Pandas (CSV, Excel, SQL, API)."},
    {l:"🧹 Nettoyer les données", m:"Donne-moi le code complet de data wrangling : valeurs manquantes, outliers, encodage, normalisation."},
    {l:"📊 EDA automatique", m:"Génère un script Python d'analyse exploratoire (EDA) complet et automatisé."},
    {l:"🤖 Choisir un algo ML", m:"Aide-moi à choisir le bon algorithme ML selon mon problème."},
    {l:"🗺️ Créer une carte", m:"Montre comment créer une carte interactive complète avec Folium : marqueurs, heatmap et choroplèthe."},
    {l:"📝 Rédiger le rapport", m:"Génère une structure de rapport Data Science professionnelle complète."},
    {l:"📈 Dashboard Dash", m:"Génère le squelette d'un dashboard Dash avec Plotly, dropdown et callback."},
  ];

  const tabs = [{id:"profil",icon:"👤",label:"Profil"},{id:"chat",icon:"💬",label:"Chat IA"},{id:"squelettes",icon:"📐",label:"Squelettes"},{id:"methodo",icon:"🗺️",label:"Méthodo"}];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#0a0e1a",color:"#e2e8f0",fontFamily:"'Segoe UI', sans-serif",overflow:"hidden"}}>
      
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0d1b3e 0%,#1a237e 50%,#0d1b3e 100%)",padding:"10px 20px",borderBottom:"1px solid #1e3a8a",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <img src={`data:image/jpeg;base64,${PHOTO_B64}`} alt="Housseïne" style={{width:"42px",height:"42px",borderRadius:"50%",border:"2px solid #3b82f6",objectFit:"cover"}} />
          <div>
            <div style={{fontWeight:"700",fontSize:"15px",color:"#e0e7ff"}}>DataBot Pro <span style={{fontSize:"11px",background:"#1e3a8a",borderRadius:"4px",padding:"1px 6px",marginLeft:"4px",color:"#93c5fd"}}>IBM Certified</span></div>
            <div style={{fontSize:"11px",color:"#64748b"}}>TCHATAKOURA Housseïne • Data Scientist • Kara, Togo 🇹🇬</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"6px"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{background:activeTab===t.id?"#1e40af":"transparent",color:activeTab===t.id?"white":"#64748b",border:activeTab===t.id?"none":"1px solid #1e3a8a",borderRadius:"6px",padding:"5px 12px",cursor:"pointer",fontSize:"12px",fontWeight:activeTab===t.id?"700":"400"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB PROFIL */}
      {activeTab==="profil" && (
        <div style={{flex:1,overflowY:"auto",background:"linear-gradient(160deg,#050a14 0%,#0a1628 100%)"}}>
          {/* Hero */}
          <div style={{background:"linear-gradient(135deg,#0d1b3e,#1a237e,#0d1b3e)",padding:"40px 20px 30px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:"radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 60%)"}} />
            <div style={{position:"relative",zIndex:1}}>
              <div style={{position:"relative",display:"inline-block",marginBottom:"16px"}}>
                <img src={`data:image/jpeg;base64,${PHOTO_B64}`} alt="Housseïne" style={{width:"110px",height:"110px",borderRadius:"50%",border:"3px solid #3b82f6",objectFit:"cover",boxShadow:"0 0 30px rgba(59,130,246,0.4)"}} />
                <div style={{position:"absolute",bottom:"4px",right:"4px",background:"#10b981",width:"18px",height:"18px",borderRadius:"50%",border:"2px solid #0a0e1a"}} />
              </div>
              <div style={{fontSize:"26px",fontWeight:"800",color:"white",letterSpacing:"-0.5px"}}>TCHATAKOURA Housseïne</div>
              <div style={{fontSize:"14px",color:"#93c5fd",marginTop:"6px",fontWeight:"500"}}>Data Scientist & Spécialiste Suivi-Évaluation</div>
              <div style={{fontSize:"12px",color:"#64748b",marginTop:"4px"}}>Agroéconomie | IBM Data Science Certified</div>
              <div style={{display:"flex",justifyContent:"center",gap:"8px",marginTop:"14px",flexWrap:"wrap"}}>
                {["Python","Pandas","Scikit-learn","Plotly","Folium","SQL","SPSS","KoboToolbox"].map(s=>(
                  <span key={s} style={{background:"rgba(59,130,246,0.15)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:"20px",padding:"3px 10px",fontSize:"11px",color:"#93c5fd"}}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{maxWidth:"900px",margin:"0 auto",padding:"20px"}}>
            
            {/* Coordonnées */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"10px",marginBottom:"20px"}}>
              {[
                {icon:"📧",label:"Email",val:"tchatakourah@gmail.com",href:"mailto:tchatakourah@gmail.com"},
                {icon:"📞",label:"Téléphone",val:"+228 91 40 56 52",href:"tel:+22891405652"},
                {icon:"📍",label:"Localisation",val:"Kara, Togo 🇹🇬",href:null},
                {icon:"💼",label:"LinkedIn",val:"Voir profil",href:"https://linkedin.com/in/housseine-tchatakoura-a25a6a334"},
                {icon:"🐙",label:"GitHub",val:"tchatakourah-hash",href:"https://github.com/tchatakourah-hash"},
              ].map((c,i)=>(
                <a key={i} href={c.href||"#"} target="_blank" rel="noreferrer" style={{background:"#0d1526",border:"1px solid #1e3a8a",borderRadius:"10px",padding:"12px",display:"flex",gap:"10px",alignItems:"center",textDecoration:"none",transition:"border-color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#3b82f6"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1e3a8a"}>
                  <span style={{fontSize:"18px"}}>{c.icon}</span>
                  <div><div style={{fontSize:"10px",color:"#64748b"}}>{c.label}</div><div style={{fontSize:"12px",color:"#93c5fd",fontWeight:"500"}}>{c.val}</div></div>
                </a>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"}}>
              {/* Compétences */}
              <div style={{background:"#0d1526",border:"1px solid #1e3a8a",borderRadius:"12px",padding:"16px"}}>
                <div style={{fontWeight:"700",color:"#93c5fd",marginBottom:"12px",fontSize:"13px"}}>⚡ Compétences Techniques</div>
                {PROFIL.competences.map((c,i)=>(
                  <div key={i} style={{marginBottom:"10px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#94a3b8",marginBottom:"4px"}}>
                      <span>{c.label}</span><span style={{color:"#3b82f6",fontWeight:"600"}}>{c.niveau}%</span>
                    </div>
                    <div style={{height:"4px",background:"#1e293b",borderRadius:"2px"}}>
                      <div style={{height:"100%",width:`${c.niveau}%`,background:`linear-gradient(90deg, #3b82f6, #8b5cf6)`,borderRadius:"2px"}} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Formations & Expériences */}
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                <div style={{background:"#0d1526",border:"1px solid #1e3a8a",borderRadius:"12px",padding:"16px"}}>
                  <div style={{fontWeight:"700",color:"#93c5fd",marginBottom:"10px",fontSize:"13px"}}>🎓 Formations</div>
                  {PROFIL.formations.map((f,i)=>(
                    <div key={i} style={{marginBottom:"8px",paddingLeft:"10px",borderLeft:"2px solid #3b82f6"}}>
                      <div style={{fontSize:"12px",fontWeight:"600",color:"#e2e8f0"}}>{f.titre}</div>
                      <div style={{fontSize:"11px",color:"#64748b"}}>{f.org} • {f.periode}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"#0d1526",border:"1px solid #1e3a8a",borderRadius:"12px",padding:"16px"}}>
                  <div style={{fontWeight:"700",color:"#93c5fd",marginBottom:"10px",fontSize:"13px"}}>💼 Expériences</div>
                  {PROFIL.experiences.map((e,i)=>(
                    <div key={i} style={{marginBottom:"8px",paddingLeft:"10px",borderLeft:"2px solid #8b5cf6"}}>
                      <div style={{fontSize:"12px",fontWeight:"600",color:"#e2e8f0"}}>{e.poste}</div>
                      <div style={{fontSize:"11px",color:"#64748b"}}>{e.org} • {e.periode}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projets */}
            <div style={{background:"#0d1526",border:"1px solid #1e3a8a",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
              <div style={{fontWeight:"700",color:"#93c5fd",marginBottom:"12px",fontSize:"13px"}}>🚀 Projets Déployés</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                {PROFIL.projets.map((p,i)=>(
                  <a key={i} href={`https://${p.lien}`} target="_blank" rel="noreferrer" style={{background:"#0a1628",border:"1px solid #1e3a8a",borderRadius:"8px",padding:"12px",textDecoration:"none",display:"block",transition:"all 0.2s"}}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="#10b981"; e.currentTarget.style.background="#0d1f0d"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="#1e3a8a"; e.currentTarget.style.background="#0a1628"; }}>
                    <div style={{fontSize:"12px",fontWeight:"700",color:"#10b981"}}>🌐 {p.nom}</div>
                    <div style={{fontSize:"10px",color:"#64748b",marginTop:"4px",wordBreak:"break-all"}}>{p.lien}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Langues */}
            <div style={{background:"#0d1526",border:"1px solid #1e3a8a",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontWeight:"700",color:"#93c5fd",marginBottom:"10px",fontSize:"13px"}}>🌍 Langues</div>
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                {PROFIL.langues.map((l,i)=>(
                  <span key={i} style={{background:"rgba(139,92,246,0.15)",border:"1px solid rgba(139,92,246,0.3)",borderRadius:"20px",padding:"4px 12px",fontSize:"12px",color:"#c4b5fd"}}>{l}</span>
                ))}
              </div>
            </div>

            <button onClick={()=>setActiveTab("chat")} style={{width:"100%",background:"linear-gradient(135deg,#1e40af,#7c3aed)",color:"white",border:"none",borderRadius:"10px",padding:"14px",fontSize:"14px",fontWeight:"700",cursor:"pointer",marginTop:"16px"}}>
              💬 Utiliser DataBot Pro →
            </button>
          </div>
        </div>
      )}

      {/* TAB CHAT */}
      {activeTab==="chat" && (
        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          {/* Sidebar */}
          <div style={{width:"190px",background:"#070d1a",borderRight:"1px solid #0f2040",padding:"10px",overflowY:"auto",flexShrink:0}}>
            <div style={{fontSize:"10px",fontWeight:"700",color:"#1e40af",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"8px"}}>Volets</div>
            {VOLETS.map(v=>(
              <button key={v.id} onClick={()=>{ send(`Je veux faire une analyse de type "${v.label}". Explique-moi : 1) quand l'utiliser, 2) les étapes clés, 3) les bibliothèques Python recommandées, 4) un exemple concret.`); }}
                style={{width:"100%",background:"#0a1628",border:`1px solid ${v.color}22`,borderRadius:"8px",padding:"8px",marginBottom:"5px",cursor:"pointer",textAlign:"left"}}
                onMouseEnter={e=>e.currentTarget.style.background=v.color+"22"} onMouseLeave={e=>e.currentTarget.style.background="#0a1628"}>
                <div style={{fontSize:"11px",color:v.color,fontWeight:"600"}}>{v.emoji} {v.label}</div>
                <div style={{fontSize:"10px",color:"#475569",marginTop:"1px"}}>{v.desc}</div>
              </button>
            ))}
            <div style={{borderTop:"1px solid #0f2040",paddingTop:"8px",marginTop:"4px",display:"flex",flexDirection:"column",gap:"6px"}}>
              <button onClick={()=>send("Sur la base de notre conversation, génère un rapport Data Science final complet et structuré : Titre, Résumé exécutif, Contexte, Problématique, Méthodologie IBM 10 étapes, Résultats, Conclusions, Recommandations actionnables.")}
                style={{width:"100%",background:"linear-gradient(135deg,#1e40af,#7c3aed)",color:"white",border:"none",borderRadius:"8px",padding:"8px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>
                📝 Générer Rapport
              </button>
              <input type="file" ref={fileRef} onChange={handleFile} accept=".csv,.xlsx,.json,.txt,.pdf" style={{display:"none"}} />
              <button onClick={()=>fileRef.current.click()} style={{width:"100%",background:"#0a1628",color:"#64748b",border:"1px dashed #1e3a8a",borderRadius:"8px",padding:"8px",cursor:"pointer",fontSize:"11px"}}>
                📁 Importer Fichier
              </button>
              {uploadedFile && <div style={{fontSize:"10px",color:"#10b981",textAlign:"center"}}>✓ {uploadedFile}</div>}
            </div>
          </div>

          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {/* Quick prompts */}
            <div style={{padding:"6px 10px",borderBottom:"1px solid #0f2040",display:"flex",gap:"5px",overflowX:"auto",flexShrink:0}}>
              {QUICK.map((q,i)=>(
                <button key={i} onClick={()=>send(q.m)} style={{whiteSpace:"nowrap",background:"#0a1628",color:"#64748b",border:"1px solid #1e3a8a",borderRadius:"20px",padding:"3px 10px",fontSize:"11px",cursor:"pointer",flexShrink:0}}>
                  {q.l}
                </button>
              ))}
            </div>
            {/* Messages */}
            <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>
              {messages.map((m,i)=>(
                <div key={i} style={{display:"flex",flexDirection:m.role==="user"?"row-reverse":"row",gap:"8px",alignItems:"flex-start"}}>
                  {m.role==="assistant" ? (
                    <img src={`data:image/jpeg;base64,${PHOTO_B64}`} style={{width:"30px",height:"30px",borderRadius:"50%",border:"1px solid #1e40af",objectFit:"cover",flexShrink:0}} alt="" />
                  ) : (
                    <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#4f46e5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",flexShrink:0}}>👤</div>
                  )}
                  <div style={{maxWidth:"80%",background:m.role==="user"?"#0d1b3e":"#0a1628",borderRadius:"12px",padding:"10px 14px",fontSize:"13px",lineHeight:"1.6",border:m.role==="user"?"1px solid #1e3a8a":"1px solid #0f2040"}}>
                    {formatMsg(m.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                  <img src={`data:image/jpeg;base64,${PHOTO_B64}`} style={{width:"30px",height:"30px",borderRadius:"50%",border:"1px solid #1e40af",objectFit:"cover"}} alt="" />
                  <div style={{background:"#0a1628",border:"1px solid #0f2040",borderRadius:"12px",padding:"10px 14px",display:"flex",gap:"5px",alignItems:"center"}}>
                    {[0,1,2].map(j=><div key={j} style={{width:"7px",height:"7px",borderRadius:"50%",background:"#3b82f6",animation:`pulse 1s ease-in-out ${j*0.2}s infinite alternate`}} />)}
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>
            {/* Input */}
            <div style={{padding:"10px",borderTop:"1px solid #0f2040",display:"flex",gap:"8px"}}>
              <textarea value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} }}
                placeholder="Décris ton problème Data Science... (Entrée pour envoyer)"
                style={{flex:1,background:"#0a1628",border:"1px solid #1e3a8a",borderRadius:"10px",color:"#e2e8f0",padding:"9px 14px",fontSize:"13px",resize:"none",height:"46px",fontFamily:"inherit",outline:"none"}} />
              <button onClick={()=>send()} disabled={!input.trim()||loading}
                style={{background:input.trim()&&!loading?"linear-gradient(135deg,#1e40af,#7c3aed)":"#0f2040",color:"white",border:"none",borderRadius:"10px",padding:"0 16px",cursor:input.trim()&&!loading?"pointer":"default",fontSize:"16px"}}>
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB SQUELETTES */}
      {activeTab==="squelettes" && (
        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          <div style={{width:"190px",background:"#070d1a",borderRight:"1px solid #0f2040",padding:"10px",overflowY:"auto",flexShrink:0}}>
            <div style={{fontSize:"10px",fontWeight:"700",color:"#1e40af",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"8px"}}>Volets</div>
            {VOLETS.map(v=>(
              <button key={v.id} onClick={()=>{setSelectedVolet(v.id);setSelectedStep(null);}}
                style={{width:"100%",background:selectedVolet===v.id?v.color+"22":"#0a1628",border:`1px solid ${selectedVolet===v.id?v.color:v.color+"22"}`,borderRadius:"8px",padding:"8px",marginBottom:"5px",cursor:"pointer",textAlign:"left",display:"flex",gap:"6px",alignItems:"center"}}>
                <span style={{fontSize:"14px"}}>{v.emoji}</span>
                <span style={{color:v.color,fontWeight:"600",fontSize:"11px"}}>{v.label}</span>
              </button>
            ))}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"18px"}}>
            {!selectedVolet ? (
              <div style={{textAlign:"center",padding:"60px",color:"#475569"}}>
                <div style={{fontSize:"48px",marginBottom:"10px"}}>📐</div>
                <div style={{fontSize:"16px",color:"#64748b"}}>Sélectionne un volet pour voir le squelette complet</div>
              </div>
            ) : (()=>{
              const sq = SQUELETTES[selectedVolet];
              const v = VOLETS.find(x=>x.id===selectedVolet);
              return (
                <div>
                  <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"16px"}}>
                    <span style={{fontSize:"24px"}}>{v.emoji}</span>
                    <div>
                      <div style={{fontSize:"16px",fontWeight:"700",color:v.color}}>{sq.title}</div>
                      <div style={{fontSize:"11px",color:"#64748b"}}>Démarche étape par étape avec code Python</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:"6px",marginBottom:"14px",flexWrap:"wrap"}}>
                    {sq.steps.map((s,i)=>(
                      <button key={i} onClick={()=>setSelectedStep(selectedStep===i?null:i)}
                        style={{background:selectedStep===i?v.color:"#0a1628",color:selectedStep===i?"white":"#64748b",border:`1px solid ${v.color}`,borderRadius:"6px",padding:"5px 12px",cursor:"pointer",fontSize:"11px",fontWeight:"600"}}>
                        {s.num} {s.title}
                      </button>
                    ))}
                  </div>
                  {(selectedStep!==null?[sq.steps[selectedStep]]:sq.steps).map((s,i)=>{
                    const idx = selectedStep!==null?selectedStep:i;
                    const cid = `${selectedVolet}-${idx}`;
                    const realCode = s.code.replace(/\\n/g,"\n");
                    return (
                      <div key={idx} style={{background:"#0a1628",border:"1px solid #0f2040",borderRadius:"10px",padding:"14px",marginBottom:"12px",borderLeft:`3px solid ${v.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                          <div><span style={{background:v.color,color:"white",borderRadius:"4px",padding:"2px 7px",fontSize:"10px",fontWeight:"700",marginRight:"8px"}}>{s.num}</span><span style={{fontWeight:"600",fontSize:"13px"}}>{s.title}</span></div>
                          <button onClick={()=>copyCode(s.code,cid)} style={{background:copied===cid?"#10b981":"#1e293b",color:"white",border:"none",borderRadius:"5px",padding:"3px 10px",cursor:"pointer",fontSize:"11px"}}>{copied===cid?"✓ Copié":"📋 Copier"}</button>
                        </div>
                        <div style={{background:"#1e1e2e",borderRadius:"6px",padding:"12px",fontFamily:"monospace",fontSize:"12px",color:"#cdd6f4",overflow:"auto",maxHeight:"240px"}}>
                          <pre style={{margin:0,whiteSpace:"pre-wrap"}}>{realCode}</pre>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{background:"#071420",border:"1px solid #0f766e",borderRadius:"10px",padding:"14px",marginTop:"8px"}}>
                    <div style={{fontWeight:"700",color:"#5eead4",marginBottom:"8px",fontSize:"13px"}}>📝 Structure du Rapport Final</div>
                    <pre style={{margin:0,fontFamily:"inherit",fontSize:"12px",color:"#94a3b8",whiteSpace:"pre-wrap",lineHeight:"1.8"}}>{sq.rapport}</pre>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB METHODO */}
      {activeTab==="methodo" && (
        <div style={{flex:1,overflowY:"auto",padding:"24px 20px"}}>
          <div style={{maxWidth:"700px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"24px"}}>
              <img src={`data:image/jpeg;base64,${PHOTO_B64}`} style={{width:"60px",height:"60px",borderRadius:"50%",border:"2px solid #3b82f6",objectFit:"cover",marginBottom:"10px"}} alt="" />
              <div style={{fontSize:"18px",fontWeight:"700",color:"#e0e7ff"}}>Méthodologie IBM Data Science</div>
              <div style={{color:"#64748b",fontSize:"12px"}}>10 étapes structurées • Par TCHATAKOURA Housseïne</div>
            </div>
            {METHODO.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:"14px",marginBottom:"12px",position:"relative"}}>
                {i<METHODO.length-1 && <div style={{position:"absolute",left:"19px",top:"42px",width:"2px",height:"calc(100% + 4px)",background:"linear-gradient(#1e40af,#0891b2)",zIndex:0}} />}
                <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"linear-gradient(135deg,#1e40af,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"12px",color:"white",flexShrink:0,zIndex:1}}>{m.step}</div>
                <div style={{flex:1,background:"#0a1628",borderRadius:"10px",padding:"10px 14px",border:"1px solid #0f2040",display:"flex",gap:"10px",alignItems:"center"}}>
                  <span style={{fontSize:"18px"}}>{m.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:"600",fontSize:"13px",color:"#e2e8f0"}}>{m.titre}</div>
                    <div style={{color:"#64748b",fontSize:"11px",marginTop:"2px"}}>{m.desc}</div>
                  </div>
                  <button onClick={()=>{setActiveTab("chat");send(`Explique-moi en détail l'étape ${m.step} de la méthodologie IBM : "${m.titre}". Donne des exemples pratiques et le code Python.`);}}
                    style={{background:"#0f2040",color:"#64748b",border:"none",borderRadius:"5px",padding:"4px 10px",cursor:"pointer",fontSize:"11px",whiteSpace:"nowrap"}}>
                    Détails →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { from{opacity:0.3} to{opacity:1} }
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#050a14}
        ::-webkit-scrollbar-thumb{background:#1e3a8a;border-radius:3px}
      `}</style>
    </div>
  );
}
