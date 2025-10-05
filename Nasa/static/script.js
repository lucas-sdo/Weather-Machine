document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('load', function () {
        const loadingScreen = document.getElementById('loader');

        loadingScreen.style.display = 'none';
    });

    const inputSearch = document.querySelector('#search');
    const cidades = Array.from(document.querySelectorAll('#cidades label'));
    const grafico_temperatura = document.getElementById('grafico_temperatura');
    const grafico_chuva = document.getElementById('grafico_chuva');
    const grafico_umidade = document.getElementById('grafico_umidade');
    const grafico_vento = document.getElementById('grafico_vento');
    const grafico_UVA = document.getElementById('grafico_UVA');
    const body = document.getElementById('body');
    const loaderOverlay = document.getElementById('loader_overlay');

    // Dictionary for translation
    const niveis = {
        pt: {
            umidade: ['baixa', 'média', 'alta'],
            chuva: ['fraca (em alguns casos nula)', 'moderada', 'alta', 'chuva forte'],
            UVA: ['baixo', 'moderado', 'alto', 'muito alto']
        },
        en: {
            umidade: ['low', 'medium', 'high'],
            chuva: ['weak (in some cases none)', 'moderate', 'high', 'heavy rain'],
            UVA: ['low', 'moderate', 'high', 'very high']
        }
    };
    const frases_previsao = {
        pt: "Se prepare para {temp}°C ({temp_f}°F), {chuva} milímetros de chuva, isto é chuva {chuva_nivel}. O vento se moverá a cerca de {vento} m/s, lembre-se sempre da umidade ela estará {umidade_nivel}, cerca de {umidade} g/kg. Teremos {uva} MJ/m² de raios UVA, o que é {uva_nivel}.",

        en: "Prepare for {temp}°C ({temp_f}°F), {chuva} mm of rain, which is {chuva_nivel}. The wind will move at about {vento} m/s, always remember of humidity, it'll be {umidade_nivel}, about {umidade} g/kg. There will be {uva} MJ/m² of UVA rays, which is {uva_nivel}."
    };
    const traducoes = {
        pt: {
            selecionar_idioma: "Idioma",
            titulo: "Weather Machine",
            enviar: "Enviar",
            filtrar: "Filtrar Dados",
            recomendacoes: "Recomendações:",
            margem_erro: "A Previsão por IA tem uma margem de erro de cerca de 30%, devido as mudanças climáticas principalmente",
            alerta_data: "Insira uma data!",
            alerta_cidade: "Selecione uma cidade!",
            previsoes: "Insira os dados para ter sua previsão por IA!",
            curiosidades: {
                curiosidade1: "CURIOSIDADE: Você sabia que este website foi feito por uma única pessoa em 2 dias?",
                curiosidade2: "CURIOSIDADE: Marte tem tempestades de poeira gigantes que podem cobrir o planeta inteiro. Na Lua, a poeira é tão fina que se move com cargas elétricas provocadas pela luz solar!",
                curiosidade3: "VOCÊ SABIA?: O recorde mundial de mm de chuva foi de 1.825 mm em 24 horas, em Foc-Foc, na ilha de Reunião, em 1952, praticamente 2 metros de água em um dia!",
                curiosidade4: 'CURIOSIDADE: O núcleo da terra tem uma temperatura média de ~6000°C, já a da superfice do sol é de ~5.500 °C, isto significa que é mais "fresco" estar no centro da terra do que na superfice do sol!',
                curiosidade5: "VOCÊ SABIA?: O Empire State Building recebe, em média, 20 a 25 relâmpagos por ano, mostrando que o raio pode atingir o mesmo ponto várias vezes!",
                curiosidade6: 'VOCÊ SABIA?: Júpter tem uma enorme tempestade, seu nome é "grande mancha vermelha". A Grande Mancha Vermelha dura há pelo menos 359 anos, e alguns cientistas acreditam que a sua forma atual seja a mesma que foi observada em 1665.',
                curiosidade7: "CURIOSIDADE: Vênus, apesar de não ser o mais próximo do Sol, tem temperaturas médias de 465 °C, mais quentes que Mercúrio, por causa do efeito estufa extremo.",
                curiosidade8: "VOCÊ SABIA?: Em algumas regiões, a chuva pode parecer vermelha, amarela ou até preta, devido a poeira, areia ou poluição transportada pelo vento!",
                curiosidade9: "CURIOSIDADE: Certos tipos de granizo ou cristais de neve que caem rapidamente produzem sons agudos ou vibrantes, quase como instrumentos naturais.",
                curiosidade10: "CURIOSIDADE: Ventos persistentes podem, ao longo de anos, desviar pequenos rios ou formar dunas que alteram cursos de água, literalmente moldando o território com o clima!",
            },
            cidades: {
                Acra: "Acra",
                Amsterdam: "Amsterdam",
                Atenas: "Atenas",
                Atlanta: "Atlanta",
                Bangkok: "Bangkok",
                Barcelona: "Barcelona",
                Bejing: "Beijing",
                "Belo Horizonte": "Belo Horizonte",
                Berlim: "Berlim",
                Bogotá: "Bogotá",
                Brasília: "Brasília",
                Bruxelas: "Bruxelas",
                Budapeste: "Budapeste",
                "Buenos Aires": "Buenos Aires",
                Cairo: "Cairo",
                Caracas: "Caracas",
                Chicago: "Chicago",
                "Cidade do México": "Cidade do México",
                Dallas: "Dallas",
                Denever: "Denver",
                Dubai: "Dubai",
                Dublim: "Dublin",
                Goiânia: "Goiânia",
                Guatemala: "Guatemala",
                Havana: "Havana",
                Istambul: "Istambul",
                Jacarta: "Jacarta",
                Jerusalém: "Jerusalém",
                Johanesburgo: "Johanesburgo",
                Kiev: "Kiev",
                "La Paz": "La Paz",
                Lima: "Lima",
                Lisboa: "Lisboa",
                Londres: "Londres",
                "Los Angeles": "Los Angeles",
                Luanda: "Luanda",
                Luxemburgo: "Luxemburgo",
                Madri: "Madri",
                Milão: "Milão",
                Montevideo: "Montevideo",
                Moscou: "Moscou",
                Mumbai: "Mumbai",
                Munique: "Munique",
                "Nova Iorque": "Nova Iorque",
                Ottawa: "Ottawa",
                Paris: "Paris",
                Porto: "Porto",
                Quebec: "Quebec",
                Quito: "Quito",
                "Rio de Janeiro": "Rio de Janeiro",
                Roma: "Roma",
                Santiago: "Santiago",
                "São Paulo": "São Paulo",
                Seoul: "Seoul",
                Shangai: "Shangai",
                Sidney: "Sidney",
                "Tel Aviv": "Tel Aviv",
                Tokyo: "Tokyo",
                Toronto: "Toronto",
                Varsóvia: "Varsóvia",
                Washington: "Washington"
            }
        },
        en: {
            selecionar_idioma: "Language",
            titulo: "Weather Machine",
            enviar: "Submit",
            recomendacoes: "Recommendations:",
            filtrar: "Filter Data",
            margem_erro: "AI Forecast has an approximate 30% margin of error, mainly due to climate changes",
            alerta_data: "Please enter a date!",
            alerta_cidade: "Please select a city!",
            previsoes: "Insert the data to have AI prediction!",
            curiosidades: {
                curiosidade1: "FUN FACT: Did you know this website was made by a single person during 2 days?",
                curiosidade2: "FUN FACT: Mars has dust tunderstorms big enought that could cover the wole planet! In the moon the dust's so thin that it moves with eletrical charges provoked by sun light!",
                curiosidade3: "DID YOU KNOW?: The world record of milimeters of rain was about 1.825 in 24 hours, In Foc-Foc, in the island of Reunião, in 1952, almost 2 meters of water in a single day!",
                curiosidade4: "FUN FACT: The Earth's core has an average temperature of ~6000°C, while the Sun's surface is ~5,500°C, which means it is cooler to be in the center of the Earth than on the Sun's surface!",
                curiosidade5: "DID YOU KNOW?: The Empire State Building recives, about, 20 to 25 lighting by year, showing that a lighting can hit the same spot several times!",
                curiosidade6: "DID YOU KNOW?: Jupter has a huge storm, it's name is Great Red Spot. The Great Red Spot it lasts for a least 359 years, and some sientists belive it's now shape's the same as it was observed in 1665.",
                curiosidade7: "INTERESTING FACT: Venus, despite not being the closest to the Sun, has average temperatures of 465°C, hotter than Mercury, due to the extreme greenhouse effect.",
                curiosidade8: "DID YOU KNOW?: in some regions, the rain can looks like red, yellow or even black, due to dust, sand or pollution transported by the wind!",
                curiosidade9: "INTERESTING FACT: Certain types of hail or snow cristals that fall quickly produce high-pitched or vibrant sounds, almost like intruments!",
                curiosidade10: "FUN FACT: Persistent winds can, over the years, divert small rivers or form dunes that alter watercourses, literally shaping the land with the climate!",
            },
            cidades: {
                Acra: "Accra",
                Amsterdam: "Amsterdam",
                Atenas: "Athens",
                Atlanta: "Atlanta",
                Bangkok: "Bangkok",
                Barcelona: "Barcelona",
                Bejing: "Beijing",
                "Belo Horizonte": "Belo Horizonte",
                Berlim: "Berlin",
                Bogotá: "Bogotá",
                Brasília: "Brasília",
                Bruxelas: "Brussels",
                Budapeste: "Budapest",
                "Buenos Aires": "Buenos Aires",
                Cairo: "Cairo",
                Caracas: "Caracas",
                Chicago: "Chicago",
                "Cidade do México": "Mexico City",
                Dallas: "Dallas",
                Denever: "Denver",
                Dubai: "Dubai",
                Dublim: "Dublin",
                Goiânia: "Goiânia",
                Guatemala: "Guatemala",
                Havana: "Havana",
                Istambul: "Istanbul",
                Jacarta: "Jakarta",
                Jerusalém: "Jerusalem",
                Johanesburgo: "Johannesburg",
                Kiev: "Kiev",
                "La Paz": "La Paz",
                Lima: "Lima",
                Lisboa: "Lisbon",
                Londres: "London",
                "Los Angeles": "Los Angeles",
                Luanda: "Luanda",
                Luxemburgo: "Luxembourg",
                Madri: "Madrid",
                Milão: "Milan",
                Montevideo: "Montevideo",
                Moscou: "Moscow",
                Mumbai: "Mumbai",
                Munique: "Munich",
                "Nova Iorque": "New York",
                Ottawa: "Ottawa",
                Paris: "Paris",
                Porto: "Porto",
                Quebec: "Quebec",
                Quito: "Quito",
                "Rio de Janeiro": "Rio de Janeiro",
                Roma: "Rome",
                Santiago: "Santiago",
                "São Paulo": "São Paulo",
                Seoul: "Seoul",
                Shangai: "Shanghai",
                Sidney: "Sydney",
                "Tel Aviv": "Tel Aviv",
                Tokyo: "Tokyo",
                Toronto: "Toronto",
                Varsóvia: "Warsaw",
                Washington: "Washington"
            }
        }
    };
    const textos = {
        pt: {
            quente: "Será um dia bem quente, com umidade baixa, beba muita água e use protetor solar!",
            calor: "Será um dia bem quente! Beba muita água e use protetor solar!",
            sol_e_chuva: "Será um dia com sol, mas espere encontrar uma chuva leve-moderada!",
            umido: "Será um dia umido, isto significa que talvez chova!",
            frio: "Será um dia frio! Use um casaco e evite sair de áreas cobertas!",
            muitoFrio: "Será um dia muito frio! Cuidado, existe uma chance de neve, evite sair de áreas cobertas!",
            extremoFrio: "ATENÇÃO SERÁ UM DIA EXTREMAMENTE FRIO! RECOMENDAMOS SE POSSÍVEL REMARCAR A DATA DO EVENTO",
            chuvaFraca: "Vai chover pouco, uma garoa! Não se preocupe, você não precisa interromper suas atividades em razão dela",
            chuvaModerada: "Se prepare para uma chuva modeerada! Leve guarda-chuva e permaneça em um lugar coberto!",
            chuvaForte: "ATENÇÃO SERÁ UM DIA EXTREMAMENTE CHUVOSO! RECOMENDAMOS SE POSSÍVEL REMARCAR A DATA DO EVENTO!",
            agradavel: "Será um dia bem agradável, aproveite!"
        },
        en: {
            quente: "It'll be a hot day with low humidity, drink plenty of water and use sunscreen!",
            calor: "It'll be much hot! Drink a lot of water and use sunscreen!",
            sol_e_chuva: "There'll be pretty much sun, but be ready to find an low-moderate rain!",
            umido: "It'll be a wet day, That means it might rain!",
            frio: "It'll be a cold day! Wear a coat and avoid going outdoors if possible!",
            muitoFrio: "It'll be a very cold day! Be careful, there might be snow, stay indoors if possible!",
            extremoFrio: "WARNING: EXTREMELY COLD DAY! WE RECOMMEND RESCHEDULING OUTDOOR EVENTS IF POSSIBLE",
            chuvaFraca: "It won't rain much! Don't worry, you don't need to interrupt your activities because of it.",
            chuvaModerada: "Prepare for a moderate rain! Take an umbrella and stay under cover!",
            chuvaForte: "WARNING: EXTREMELY RAINY DAY! WE RECOMMEND RESCHEDULING OUTDOOR EVENTS IF POSSIBLE",
            agradavel: "It'll be a pleasant day, enjoy!"
        }
    };
    // Dictionary for translation

    let currentIdioma = 'en'; // Start in english
    let chart_temperatura, chart_chuva, chart_umidade, chart_vento, chart_UVA;

    // Filter data
    function normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    inputSearch.addEventListener("input", function () {
        const str = normalizeText(this.value.trim());
        if (str) {
            filter_data(str);
        } else {
            show_all_items();
        }
    });

    function show_all_items() {
        cidades.forEach(label => label.classList.remove('hide'));
    }

    function filter_data(str) {
        cidades.forEach(label => {
            const city = normalizeText(label.textContent);
            if (city.includes(str)) {
                label.classList.remove('hide');
            } else {
                label.classList.add('hide');
            }
        });
    }
    // Filter data

    let btn_enviar_dados = document.querySelector('button');
    btn_enviar_dados.addEventListener('click', enviar_dados);

    let slc_idioma = document.getElementById('slc_idioma');
    slc_idioma.addEventListener('change', function () {
        trocarIdioma(this.value);
    });

    function enviar_dados() {
        let data = document.getElementById('date').value;
        let cidade = document.querySelector('input[name="cidade"]:checked');

        if (!data) {
            alert(traducoes[currentIdioma].alerta_data);
            return;
        }

        if (!cidade) {
            alert(traducoes[currentIdioma].alerta_cidade);
            return;
        }

        const cidade_selecionada = cidade.value;
        const data_selecionada = data;

        const dados = {
            cidade: cidade_selecionada,
            data: data_selecionada
        };

        enviar_para_o_backend(cidade_selecionada, data_selecionada);
        gerar_curiosidade();
    }

    function enviar_para_o_backend(cidade_selecionada, data_selecionada) {
        loaderOverlay.style.display = 'flex';

        const novoDado = {
            cidade: cidade_selecionada,
            data: data_selecionada
        };

        fetch("http://127.0.0.1:5000/salvar", { // Sending to backend (index.py)
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoDado)
        })
            .then(response => response.json())
            .then(data => {
                //processing data
                loaderOverlay.style.display = 'none';

                let valor_da_umidade;
                let valor_da_UVA;

                const valor_temperatura = parseFloat(data['previsao']['temperatura']);
                const valor_chuva = Math.max(0, parseFloat(data['previsao']['chuva']));
                const valor_vento = parseFloat(data['previsao']['vento']);
                const valor_umidade = Math.max(0, parseFloat(data['previsao']['umidade']));
                const valor_UVA = Math.max(0, parseFloat(data['previsao']['uva']));

                const labels = data['historico']['datas'];
                const valores_temperatura = data['historico']['temperatura'];
                const valores_chuva = data['historico']['chuva'];
                const valores_vento = data['historico']['vento'];
                const valores_umidade = data['historico']['umidade'];
                const valores_UVA = data['historico']['uva'];

                function encontrar_nivel_da_chuva(v) {
                    if (isNaN(v)) return 'desconhecido';

                    if (v < 5) return niveis[currentIdioma].chuva[0];
                    if (v < 10) return niveis[currentIdioma].chuva[1];
                    if (v < 35) return niveis[currentIdioma].chuva[2];
                    return niveis[currentIdioma].chuva[3];
                }

                function encontrar_nivel_da_umidade(v) {
                    if (isNaN(v)) return 'desconhecida';
                    if (v <= 5) return niveis[currentIdioma].umidade[0];
                    if (v <= 12) return niveis[currentIdioma].umidade[1];
                    return niveis[currentIdioma].umidade[2];
                }

                function encontrar_nivel_de_UVA(v) {
                    if (isNaN(v)) return 'desconhecido';

                    if (v < 1) return niveis[currentIdioma].UVA[0];
                    if (v < 1.5) return niveis[currentIdioma].UVA[1];
                    if (v < 2) return niveis[currentIdioma].UVA[2];
                    return niveis[currentIdioma].UVA[3];
                }

                function encontrar_nivel_da_temperatura(temp, chuva, uva) {
                    if (temp <= 1) {
                        body.style.backgroundImage = "url('/static/images/background_neve.png')";
                    }
                    else if (chuva >= 10) {
                        body.style.backgroundImage = "url('/static/images/background_chuva.png')";
                    }
                    else if (uva < 1) {
                        body.style.backgroundImage = "url('/static/images/background_nublado.png')";
                    }
                    else if (temp >= 30 && uva >= 2) {
                        body.style.backgroundImage = "url('/static/images/background_calor.png')";
                    }
                    else if (temp >= 25) {
                        body.style.backgroundImage = "url('/static/images/background_sol.png')";
                    }
                    else if (temp >= 15 && chuva >= 7) {
                        body.style.backgroundImage = "url('/static/images/background_parcialmente_nublado.png')";
                    }
                    else if (chuva > 5 && temp >= 18) {
                        body.style.backgroundImage = "url('/static/images/background_parcialmente.png')";
                    }
                    else {
                        body.style.backgroundImage = "url('/static/images/background_agradavel.png')";
                    }
                }

                function recomendacoes(valor_temperatura, valor_chuva, valor_umidade, valor_UVA) {
                    const recDiv = document.getElementById('recomendacoes');
                    recDiv.style.color = 'black';

                    if (valor_chuva >= 80) {
                        recDiv.style.color = 'red';
                        recDiv.innerHTML = textos[currentIdioma].chuvaForte;
                    }
                    else if (valor_chuva >= 45) {
                        recDiv.innerHTML = textos[currentIdioma].chuvaModerada;
                    }
                    else if (valor_temperatura <= -10) {
                        recDiv.style.color = 'red';
                        recDiv.innerHTML = textos[currentIdioma].extremoFrio;
                    }
                    else if (valor_temperatura <= 1) {
                        recDiv.innerHTML = textos[currentIdioma].muitoFrio;
                    }
                    else if (valor_temperatura <= 10) {
                        recDiv.innerHTML = textos[currentIdioma].frio;
                    }
                    else if (valor_temperatura >= 30 && valor_umidade <= 6 && valor_UVA >= 1) {
                        recDiv.innerHTML = textos[currentIdioma].quente;
                    }
                    else if (valor_temperatura >= 25) {
                        recDiv.innerHTML = textos[currentIdioma].calor;
                    }
                    else if (valor_chuva >= 6) {
                        recDiv.innerHTML = textos[currentIdioma].chuvaFraca;
                    }
                    else if (valor_umidade >= 10) {
                        recDiv.innerHTML = textos[currentIdioma].umido;
                    }
                    else {
                        recDiv.innerHTML = textos[currentIdioma].agradavel;
                    }
                }

                function adicionarPontoPrevisao(chart, valor, label) {
                    if (!chart) return;

                    chart.data.datasets = chart.data.datasets.filter(ds => ds.label !== 'Prevision / Previsão');

                    const previsaoDataset = {
                        label: 'Prevision / Previsão',
                        data: Array(chart.data.labels.length - 1).fill(null).concat(valor),
                        borderColor: 'red',
                        pointRadius: 10,
                        pointHoverRadius: 13,
                        pointStyle: 'star',
                        showLine: false,
                        animation: {
                            duration: 500,
                            easing: 'easeOutBounce'
                        }
                    };

                    chart.data.datasets.push(previsaoDataset);
                    chart.update();
                }
                //processing data

                //Creating the graphics
                if (!chart_temperatura) {
                    chart_temperatura = new Chart(grafico_temperatura, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Temperature (°C) / Temperatura (°C)',
                                data: valores_temperatura,
                                borderColor: 'orange',
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                    });
                }
                if (!chart_chuva) {
                    chart_chuva = new Chart(grafico_chuva, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Rain (mm/day) / Chuva (mm/dia)',
                                data: valores_chuva,
                                borderColor: 'lightblue'
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                    });
                }
                if (!chart_vento) {
                    chart_vento = new Chart(grafico_vento, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Wind speed (meters/s) / Velocidade do vento (metros/s)',
                                data: valores_vento,
                                borderColor: 'gray'
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                    });
                }
                if (!chart_umidade) {
                    chart_umidade = new Chart(grafico_umidade, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Humidity / Umidade (g/kg)',
                                data: valores_umidade,
                                borderColor: 'blue'
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                    });
                }
                if (!chart_UVA) {
                    chart_UVA = new Chart(grafico_UVA, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'UVA Rays (MJ/m^2/day) / Raios UVA (MJ/m^2/dia)',
                                data: valores_UVA,
                                borderColor: 'purple'
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: "white"
                                    },
                                    grid: {
                                        color: "rgba(255,255,255,0.2)",
                                        borderColor: "white"
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                    });
                }

                valor_da_umidade = encontrar_nivel_da_umidade(valor_umidade);
                valor_da_UVA = encontrar_nivel_de_UVA(valor_UVA);
                valor_da_chuva = encontrar_nivel_da_chuva(valor_chuva);
                encontrar_nivel_da_temperatura(valor_temperatura, valor_chuva, valor_UVA);

                recomendacoes(valor_temperatura, valor_chuva, valor_umidade, valor_UVA);

                function fmt(x, decimals = 1) {
                    return isNaN(x) ? '—' : x.toFixed(decimals);
                }

                function montarFrasePrevisao(idioma, valor_temperatura, valor_chuva, valor_vento, valor_umidade, valor_UVA, valor_da_chuva, valor_da_umidade, valor_da_UVA) {
                    let frase = frases_previsao[idioma];
                    frase = frase.replace("{temp}", fmt(valor_temperatura, 1))
                        .replace("{temp_f}", fmt((valor_temperatura * 1.8) + 32, 2))
                        .replace("{chuva}", fmt(valor_chuva, 2))
                        .replace("{vento}", fmt(valor_vento, 1))
                        .replace("{umidade}", fmt(valor_umidade, 2))
                        .replace("{uva}", fmt(valor_UVA, 3))
                        .replace("{chuva_nivel}", valor_da_chuva)
                        .replace("{umidade_nivel}", valor_da_umidade)
                        .replace("{uva_nivel}", valor_da_UVA);
                    return frase;
                }

                document.getElementById('previsao').innerHTML = montarFrasePrevisao(currentIdioma, valor_temperatura, valor_chuva, valor_vento, valor_umidade, valor_UVA, valor_da_chuva, valor_da_umidade, valor_da_UVA);

                if (chart_temperatura) {
                    chart_temperatura.data.labels = labels;
                    chart_temperatura.data.datasets[0].data = valores_temperatura;
                    chart_temperatura.update();
                }
                if (chart_chuva) {
                    chart_chuva.data.labels = labels;
                    chart_chuva.data.datasets[0].data = valores_chuva;
                    chart_chuva.update();
                }
                if (chart_vento) {
                    chart_vento.data.labels = labels;
                    chart_vento.data.datasets[0].data = valores_vento;
                    chart_vento.update();
                }
                if (chart_umidade) {
                    chart_umidade.data.labels = labels;
                    chart_umidade.data.datasets[0].data = valores_umidade;
                    chart_umidade.update();
                }
                if (chart_UVA) {
                    chart_UVA.data.labels = labels;
                    chart_UVA.data.datasets[0].data = valores_UVA;
                    chart_UVA.update();
                }

                chart_temperatura.update();
                chart_chuva.update();
                chart_umidade.update();
                chart_vento.update();
                chart_UVA.update();

                adicionarPontoPrevisao(chart_temperatura, valor_temperatura, 'Temperatura');
                adicionarPontoPrevisao(chart_chuva, valor_chuva, 'Chuva');
                adicionarPontoPrevisao(chart_umidade, valor_umidade, 'Umidade');
                adicionarPontoPrevisao(chart_vento, valor_vento, 'Vento');
                adicionarPontoPrevisao(chart_UVA, valor_UVA, 'UVA');
                //Creating the graphics
            })
            .catch(error => {
                console.error("ERRO:", error);
            });
    }

    function trocarIdioma(idioma) { // Translation
        currentIdioma = idioma;

        document.querySelector('h1').textContent = traducoes[idioma].titulo;
        document.getElementById('idioma').textContent = traducoes[idioma].selecionar_idioma;
        document.querySelector('button').textContent = traducoes[idioma].enviar;
        document.getElementById('recomendacoes').textContent = traducoes[idioma].recomendacoes;
        document.getElementById('margem_de_erro').textContent = traducoes[idioma].margem_erro;
        document.getElementById('filtar_dados').textContent = traducoes[idioma].filtrar;
        document.getElementById('previsao').textContent = traducoes[idioma].previsoes

        document.querySelectorAll('#cidades label').forEach(label => {
            const input = label.querySelector('input');
            const nome = input.value;
            if (traducoes[idioma].cidades[nome]) {
                label.childNodes[1].nodeValue = ' ' + traducoes[idioma].cidades[nome];
            }
        });
    }

    function gerar_curiosidade() { //Genertating fun facts
        const curiosidades = ['curiosidade1', 'curiosidade2', 'curiosidade3', 'curiosidade4', 'curiosidade5', 'curiosidade6', 'curiosidade7', 'curiosidade8', 'curiosidade9', 'curiosidade10'];
        const escolha = curiosidades[Math.floor(Math.random() * curiosidades.length)];
        const curiosidade = document.getElementById('curiosidade');
        if (escolha == 'curiosidade1') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade1;
        }
        if (escolha == 'curiosidade2') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade2;
        }
        if (escolha == 'curiosidade3') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade3;
        }
        if (escolha == 'curiosidade4') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade4;
        }
        if (escolha == 'curiosidade5') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade5;
        }
        if (escolha == 'curiosidade6') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade6;
        }
        if (escolha == 'curiosidade7') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade7;
        }
        if (escolha == 'curiosidade8') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade8;
        }
        if (escolha == 'curiosidade9') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade9;
        }
        if (escolha == 'curiosidade10') {
            curiosidade.innerText = traducoes[currentIdioma].curiosidades.curiosidade10;
        }
    }

    trocarIdioma(currentIdioma)

    const switchBtn = document.getElementById("meuSwitch");

    switchBtn.addEventListener("change", function () { //Dark mode
        if (this.checked) {
            document.getElementById('main').style.background = 'rgba(52, 52, 52, 0.5)';
            document.getElementById('main').style.color = 'white';
            document.getElementById('previsao_main').style.background = 'rgba(52, 52, 52, 0.5)';
            document.getElementById('previsao_main').style.color = 'white';
            document.getElementById('graficos_main').style.background = 'rgba(52, 52, 52, 0.5)';
            document.getElementById('enviar').style.backgroundColor = '#F0B701';
            document.getElementById('graficos_main').style.color = 'white';
            document.getElementById('titulo').style.color = 'white';
            document.getElementById('curiosidade_main').style.color = 'white';
            document.getElementById('curiosidade_main').style.backgroundColor = 'rgba(52, 52, 52, 0.5)';
            body.style.filter = 'saturate(70%)'
            document.querySelectorAll('#cidades label').forEach(function (label) {
                label.style.backgroundColor = '#343434ff'
            })
        }
        else {
            document.getElementById('main').style.background = 'rgba(255, 255, 255, 0.5)';
            document.getElementById('main').style.color = '#545454';
            document.getElementById('previsao_main').style.background = 'rgba(255, 255, 255, 0.5)';
            document.getElementById('previsao_main').style.color = '#545454';
            document.getElementById('graficos_main').style.background = 'rgba(255, 255, 255, 0.5)';
            document.getElementById('enviar').style.backgroundColor = '#0084FF';
            document.getElementById('graficos_main').style.color = '#545454';
            document.getElementById('titulo').style.color = '#545454';
            document.getElementById('curiosidade_main').style.color = '#545454';
            document.getElementById('curiosidade_main').style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            body.style.filter = 'saturate(100%)';
            document.querySelectorAll('#cidades label').forEach(function (label) {
                label.style.backgroundColor = '#ffffffb3'
            })
        }
    });
});