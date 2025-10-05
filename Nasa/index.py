from flask import request, jsonify, render_template
import pandas as pd
from flask import Flask
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)


def adicionar_coluna_data(df):  # add the row of day and month
    df["DATA"] = pd.to_datetime(df["YEAR"].astype(
        str), format="%Y") + pd.to_timedelta(df["DOY"] - 1, unit="D")
    df["DIA_MES"] = df["DATA"].dt.strftime("%d/%m")
    return df


# Connecting to the csvs
acra = adicionar_coluna_data(pd.read_csv('dados/acra.csv'))
amsterdam = adicionar_coluna_data(pd.read_csv('dados/amsterdam.csv'))
atenas = adicionar_coluna_data(pd.read_csv('dados/atenas.csv'))
atlanta = adicionar_coluna_data(pd.read_csv('dados/atlanta.csv'))
bangkok = adicionar_coluna_data(pd.read_csv('dados/bangkok.csv'))
barcelona = adicionar_coluna_data(pd.read_csv('dados/barcelona.csv'))
bejing = adicionar_coluna_data(pd.read_csv('dados/bejing.csv'))
belo_horizonte = adicionar_coluna_data(pd.read_csv('dados/belo_horizonte.csv'))
berlim = adicionar_coluna_data(pd.read_csv('dados/berlim.csv'))
bogota = adicionar_coluna_data(pd.read_csv('dados/bogota.csv'))
brasilia = adicionar_coluna_data(pd.read_csv('dados/brasilia.csv'))
bruxelas = adicionar_coluna_data(pd.read_csv('dados/bruxelas.csv'))
budapeste = adicionar_coluna_data(pd.read_csv('dados/budapeste.csv'))
buenos_aires = adicionar_coluna_data(pd.read_csv('dados/buenos_aires.csv'))
cairo = adicionar_coluna_data(pd.read_csv('dados/cairo.csv'))
caracas = adicionar_coluna_data(pd.read_csv('dados/caracas.csv'))
chicago = adicionar_coluna_data(pd.read_csv('dados/chicago.csv'))
cidade_do_mexico = adicionar_coluna_data(
    pd.read_csv('dados/cidade_do_mexico.csv'))
dallas = adicionar_coluna_data(pd.read_csv('dados/dallas.csv'))
denever = adicionar_coluna_data(pd.read_csv('dados/denever.csv'))
dubai = adicionar_coluna_data(pd.read_csv('dados/dubai.csv'))
dublim = adicionar_coluna_data(pd.read_csv('dados/dublim.csv'))
goiania = adicionar_coluna_data(pd.read_csv('dados/goiania.csv'))
guatemala = adicionar_coluna_data(pd.read_csv('dados/guatemala.csv'))
havana = adicionar_coluna_data(pd.read_csv('dados/havana.csv'))
houston = adicionar_coluna_data(pd.read_csv('dados/houston.csv'))
istambul = adicionar_coluna_data(pd.read_csv('dados/istambul.csv'))
jakarta = adicionar_coluna_data(pd.read_csv('dados/jakarta.csv'))
jerusalem = adicionar_coluna_data(pd.read_csv('dados/jerusalem.csv'))
johanesburgo = adicionar_coluna_data(pd.read_csv('dados/johanesburgo.csv'))
kiev = adicionar_coluna_data(pd.read_csv('dados/kiev.csv'))
la_paz = adicionar_coluna_data(pd.read_csv('dados/la_paz.csv'))
lima = adicionar_coluna_data(pd.read_csv('dados/lima.csv'))
lisboa = adicionar_coluna_data(pd.read_csv('dados/lisboa.csv'))
londres = adicionar_coluna_data(pd.read_csv('dados/londres.csv'))
los_angeles = adicionar_coluna_data(pd.read_csv('dados/los_angeles.csv'))
luanda = adicionar_coluna_data(pd.read_csv('dados/luanda.csv'))
luxemburgo = adicionar_coluna_data(pd.read_csv('dados/luxemburgo.csv'))
madri = adicionar_coluna_data(pd.read_csv('dados/madri.csv'))
manaus = adicionar_coluna_data(pd.read_csv('dados/manaus.csv'))
melborn = adicionar_coluna_data(pd.read_csv('dados/melborn.csv'))
milao = adicionar_coluna_data(pd.read_csv('dados/milao.csv'))
montevideo = adicionar_coluna_data(pd.read_csv('dados/montevideo.csv'))
montreal = adicionar_coluna_data(pd.read_csv('dados/montreal.csv'))
moscou = adicionar_coluna_data(pd.read_csv('dados/moscou.csv'))
mumbai = adicionar_coluna_data(pd.read_csv('dados/mumbai.csv'))
munique = adicionar_coluna_data(pd.read_csv('dados/munique.csv'))
nova_iorque = adicionar_coluna_data(pd.read_csv('dados/nova_iorque.csv'))
ottawa = adicionar_coluna_data(pd.read_csv('dados/ottawa.csv'))
paris = adicionar_coluna_data(pd.read_csv('dados/paris.csv'))
pequim = adicionar_coluna_data(pd.read_csv('dados/pequim.csv'))
porto = adicionar_coluna_data(pd.read_csv('dados/porto.csv'))
quito = adicionar_coluna_data(pd.read_csv('dados/quito.csv'))
quebec = adicionar_coluna_data(pd.read_csv('dados/quebec.csv'))
rio_de_janeiro = adicionar_coluna_data(pd.read_csv('dados/rio_de_janeiro.csv'))
roma = adicionar_coluna_data(pd.read_csv('dados/roma.csv'))
santiago = adicionar_coluna_data(pd.read_csv('dados/santiago.csv'))
sao_paulo = adicionar_coluna_data(pd.read_csv('dados/sao_paulo.csv'))
sao_salvador = adicionar_coluna_data(pd.read_csv('dados/sao_salvador.csv'))
seoul = adicionar_coluna_data(pd.read_csv('dados/seoul.csv'))
shangai = adicionar_coluna_data(pd.read_csv('dados/shangai.csv'))
sidney = adicionar_coluna_data(pd.read_csv('dados/sidney.csv'))
tel_aviv = adicionar_coluna_data(pd.read_csv('dados/tel_aviv.csv'))
tokyo = adicionar_coluna_data(pd.read_csv('dados/tokyo.csv'))
toronto = adicionar_coluna_data(pd.read_csv('dados/toronto.csv'))
varsovia = adicionar_coluna_data(pd.read_csv('dados/Varsovia.csv'))
washington = adicionar_coluna_data(pd.read_csv('dados/washington_DC.csv'))
# Connecting to the csvs

modelo = LinearRegression()  # Creating the model

toronto["ALLSKY_SFC_UVA"].plot(kind="line", legend=True)
toronto["T2M"].plot(kind="line", legend=True)
toronto["QV2M"].plot(kind="line", legend=True)
toronto["PRECTOTCORR"].plot(kind="line", legend=True)
toronto["WS2M"].plot(kind="line", legend=True)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/salvar", methods=["POST"])
def salvar():
    cidade_e_data = request.get_json()
    cidade = cidade_e_data['cidade']
    data = cidade_e_data['data']

    mapa_cidades = {
        "Acra": acra,
        "Amsterdam": amsterdam,
        "Atenas": atenas,
        "Atlanta": atlanta,
        "Bejing": bejing,
        "Berlim": berlim,
        "Bogotá": bogota,
        "Brasília": brasilia,
        "Bruxelas": bruxelas,
        "Budapeste": budapeste,
        "Buenos Aires": buenos_aires,
        "Cairo": cairo,
        "Cidade do México": cidade_do_mexico,
        "Dubai": dubai,
        "Dallas": dallas,
        "Dublim": dublim,
        "Goiânia": goiania,
        "Havana": havana,
        "Istambul": istambul,
        "Jacarta": jakarta,
        "Jerusalém": jerusalem,
        "Johanesburgo": johanesburgo,
        "Kiev": kiev,
        "La Paz": la_paz,
        "Lima": lima,
        "Lisboa": lisboa,
        "Londres": londres,
        "Los Angeles": los_angeles,
        "Luxemburgo": luxemburgo,
        "Madri": madri,
        "Milão": milao,
        "Montevideo": montevideo,
        "Moscou": moscou,
        "Mumbai": mumbai,
        "Munique": munique,
        "Nova Iorque": nova_iorque,
        "Ottawa": ottawa,
        "Paris": paris,
        "Porto": porto,
        "Quito": quito,
        "Rio de Janeiro": rio_de_janeiro,
        "Roma": roma,
        "Santiago": santiago,
        "São Paulo": sao_paulo,
        "Seoul": seoul,
        "Shangai": shangai,
        "Sidney": sidney,
        "Tel Aviv": tel_aviv,
        "Tokyo": tokyo,
        "Toronto": toronto,
        "Varsóvia": varsovia,
        "Belo Horizonte": belo_horizonte,
        "Luanda": luanda,
        "Guatemala": guatemala,
        "Denever": denever,
        "Bangkok": bangkok,
        "Barcelona": barcelona,
        "Caracas": caracas,
        "Chicago": chicago,
        "Washington": washington,
        "Quebec": quebec,
        "Manaus": manaus,
        "Melborn": melborn,
        "Montreal": montreal,
        "Pequim": pequim
    }

    if cidade in mapa_cidades:

        # training the model
        df = mapa_cidades[cidade]

        df["DAYOFYEAR"] = df["DATA"].dt.dayofyear
        df["SIN_DIA"] = np.sin(2 * np.pi * df["DAYOFYEAR"] / 365)
        df["COS_DIA"] = np.cos(2 * np.pi * df["DAYOFYEAR"] / 365)

        X = df[["SIN_DIA", "COS_DIA"]]
        TEMPERAURA = df["T2M"]
        UMIDADE = df["QV2M"]
        CHUVA = df["PRECTOTCORR"]
        VENTO = df["WS2M"]
        UVA = df["ALLSKY_SFC_UVA"]

        modelo_temperatura = LinearRegression().fit(X, TEMPERAURA)
        modelo_umidade = LinearRegression().fit(X, UMIDADE)
        modelo_chuva = LinearRegression().fit(X, CHUVA)
        modelo_vento = LinearRegression().fit(X, VENTO)
        modelo_uva = LinearRegression().fit(X, UVA)

        data_escolhida = pd.to_datetime(data, format="%Y-%m-%d")
        dayofyear = data_escolhida.dayofyear

        sin_dia = np.sin(2 * np.pi * dayofyear / 365)
        cos_dia = np.cos(2 * np.pi * dayofyear / 365)

        X_novo = pd.DataFrame([[sin_dia, cos_dia]], columns=[
                              "SIN_DIA", "COS_DIA"])
        previsao_temperatura = modelo_temperatura.predict(X_novo)[0]
        previsao_umidade = modelo_umidade.predict(X_novo)[0]
        previsao_chuva = modelo_chuva.predict(X_novo)[0]
        previsao_vento = modelo_vento.predict(X_novo)[0]
        previsao_uva = modelo_uva.predict(X_novo)[0]
        # training the model

        df['DATA_STR'] = df['DATA'].dt.strftime('%Y-%m-%d')

        # returning the prediction
        return jsonify({
            "cidade": cidade,
            "data_escolhida": data,
            "previsao": {
                "datas": df["DATA_STR"].tolist(),
                "temperatura": previsao_temperatura,
                "umidade": previsao_umidade,
                "chuva": previsao_chuva,
                "vento": previsao_vento,
                "uva": previsao_uva
            },
            "historico": {
                "datas": df["DIA_MES"].tolist(),
                "temperatura": df["T2M"].tolist(),
                "umidade": df["QV2M"].tolist(),
                "chuva": df["PRECTOTCORR"].tolist(),
                "vento": df["WS2M"].tolist(),
                "uva": df["ALLSKY_SFC_UVA"].tolist()
            }
        })
        # returning the prediction


if __name__ == "__main__":
    app.run(debug=True)

# -BEGIN HEADER-
# NASA/POWER Source Native Resolution Daily Data # Dates (month/day/year): 01/01/2024 through 01/01/2025 in LST
# Location: latitude 5.5566 longitude -0.2139
# elevation from MERRA-2: Average for 0.5 x 0.625 degree lat/lon region = 27.76 meters
# The value for missing source data that cannot be computed or is outside of the sources availability range: -999
# parameter(s):
# ALLSKY_SFC_UVA CERES SYN1deg All Sky Surface UVA Irradiance (MJ/m^2/day)
# T2M MERRA-2 Temperature at 2 Meters (C)
# QV2M MERRA-2 Specific Humidity at 2 Meters (g/kg)
# PRECTOTCORR MERRA-2 Precipitation Corrected (mm/day)
# WS2M MERRA-2 Wind Speed at 2 Meters (m/s)
# -END HEADER-
