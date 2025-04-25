const ventasInput = document.getElementById('ventas');
    const costoVentasInput = document.getElementById('costoVentas');
    const gastosOperativosInput = document.getElementById('gastosOperativos');
    const interesesInput = document.getElementById('intereses');
    const impuestosInput = document.getElementById('impuestos');
    const activoCorrienteInput = document.getElementById('activoCorriente');
    const pasivoCorrienteInput = document.getElementById('pasivoCorriente');
    const totalActivosInput = document.getElementById('totalActivos');
    const totalPatrimonioInput = document.getElementById('totalPatrimonio');


    const ventasResult = document.getElementById('ventasResult');
    const costoVentasResult = document.getElementById('costoVentasResult');
    const gananciaBrutaResult = document.getElementById('gananciaBrutaResult');
    const gastosOperativosResult = document.getElementById('gastosOperativosResult');
    const gananciaOperativaResult = document.getElementById('gananciaOperativaResult');
    const interesesResult = document.getElementById('interesesResult');
    const gananciaAntesImpuestosResult = document.getElementById('gananciaAntesImpuestosResult');
    const impuestosResult = document.getElementById('impuestosResult');
    const gananciaNetaResult = document.getElementById('gananciaNetaResult');
    const activoCorrienteResult = document.getElementById('activoCorrienteResult');
    const pasivoCorrienteResult = document.getElementById('pasivoCorrienteResult');
    const totalActivosResult = document.getElementById('totalActivosResult');
    const totalPatrimonioResult = document.getElementById('totalPatrimonioResult');

    const margenGananciaBrutaResult = document.getElementById('margenGananciaBruta');
    const margenGananciaNetaResult = document.getElementById('margenGananciaNeta');
    const rotacionActivosResult = document.getElementById('rotacionActivos');
    const roaResult = document.getElementById('roa');
    const roeResult = document.getElementById('roe');
    const liquidezCorrienteResult = document.getElementById('liquidezCorriente');

    const analisisMargenBruto = document.getElementById('analisisMargenBruto');
    const analisisMargenNeto = document.getElementById('analisisMargenNeto');
    const analisisRotacionActivos = document.getElementById('analisisRotacionActivos');
    const analisisROA = document.getElementById('analisisROA');
    const analisisROE = document.getElementById('analisisROE');
    const analisisLiquidez = document.getElementById('analisisLiquidez');

    const calcularBtn = document.getElementById('calcularBtn');
    const limpiarBtn = document.getElementById('limpiarBtn');

    let graficoResultados;

    function calcularEstadoResultados(ventas, costoVentas, gastosOperativos, intereses, impuestos) {
        const gananciaBruta = ventas - costoVentas;
        const gananciaOperativa = gananciaBruta - gastosOperativos;
        const gananciaAntesImpuestos = gananciaOperativa - intereses;
        const gananciaNeta = gananciaAntesImpuestos * (1 - impuestos);

        return {
            ventas,
            costoVentas,
            gananciaBruta,
            gastosOperativos,
            gananciaOperativa,
            intereses,
            gananciaAntesImpuestos,
            impuestos,
            gananciaNeta,
        };
    }

    function calcularBalanceGeneral(activoCorriente, pasivoCorriente, totalActivos, totalPatrimonio) {
        return {
            activoCorriente,
            pasivoCorriente,
            totalActivos,
            totalPatrimonio
        };
    }

    function calcularIndicadoresFinancieros(estadoResultados, balanceGeneral) {
        const margenGananciaBruta = estadoResultados.gananciaBruta / estadoResultados.ventas;
        const margenGananciaNeta = estadoResultados.gananciaNeta / estadoResultados.ventas;
        const rotacionActivos = estadoResultados.ventas / balanceGeneral.totalActivos;
        const roa = estadoResultados.gananciaNeta / balanceGeneral.totalActivos;
        const roe = estadoResultados.gananciaNeta / balanceGeneral.totalPatrimonio;
        const liquidezCorriente = balanceGeneral.activoCorriente / balanceGeneral.pasivoCorriente;

        return {
            margenGananciaBruta,
            margenGananciaNeta,
            rotacionActivos,
            roa,
            roe,
            liquidezCorriente,
        };
    }

    function mostrarEstadoResultados(resultados) {
        ventasResult.textContent = resultados.ventas.toFixed(2);
        costoVentasResult.textContent = resultados.costoVentas.toFixed(2);
        gananciaBrutaResult.textContent = resultados.gananciaBruta.toFixed(2);
        gastosOperativosResult.textContent = resultados.gastosOperativos.toFixed(2);
        gananciaOperativaResult.textContent = resultados.gananciaOperativa.toFixed(2);
        interesesResult.textContent = resultados.intereses.toFixed(2);
        gananciaAntesImpuestosResult.textContent = resultados.gananciaAntesImpuestos.toFixed(2);
        impuestosResult.textContent = resultados.impuestos.toFixed(2);
        gananciaNetaResult.textContent = resultados.gananciaNeta.toFixed(2);
    }

     function mostrarBalanceGeneral(resultados) {
        activoCorrienteResult.textContent = resultados.activoCorriente.toFixed(2);
        pasivoCorrienteResult.textContent = resultados.pasivoCorriente.toFixed(2);
        totalActivosResult.textContent = resultados.totalActivos.toFixed(2);
        totalPatrimonioResult.textContent = resultados.totalPatrimonio.toFixed(2);
    }

    function mostrarIndicadoresFinancieros(indicadores) {
        margenGananciaBrutaResult.textContent = (indicadores.margenGananciaBruta * 100).toFixed(2) + "%";
        margenGananciaNetaResult.textContent = (indicadores.margenGananciaNeta * 100).toFixed(2) + "%";
        rotacionActivosResult.textContent = indicadores.rotacionActivos.toFixed(2) + " veces";
        roaResult.textContent = (indicadores.roa * 100).toFixed(2) + "%";
        roeResult.textContent = (indicadores.roe * 100).toFixed(2) + "%";
        liquidezCorrienteResult.textContent = indicadores.liquidezCorriente.toFixed(2);
    }

    function analizarResultados(indicadores) {
        analisisMargenBruto.textContent = `El margen de ganancia bruta es del ${ (indicadores.margenGananciaBruta * 100).toFixed(2) }%.  Un margen más alto indica una mejor rentabilidad en la producción y venta de bienes o servicios.`;
        analisisMargenNeto.textContent = `El margen de ganancia neta es del ${ (indicadores.margenGananciaNeta * 100).toFixed(2) }%.  Este margen refleja la eficiencia general de la empresa en la generación de ganancias después de todos los gastos.`;
        analisisRotacionActivos.textContent = `La rotación de activos es de ${ indicadores.rotacionActivos.toFixed(2) } veces.  Mide la eficiencia con la que la empresa utiliza sus activos para generar ventas. Un valor más alto sugiere una mejor eficiencia.`;
        analisisROA.textContent = `El ROA es del ${ (indicadores.roa * 100).toFixed(2) }%.  Indica la rentabilidad de los activos de la empresa. Un ROA más alto es preferible, ya que significa que la empresa está generando más ganancias por cada unidad de activo.`;
        analisisROE.textContent = `El ROE es del ${ (indicadores.roe * 100).toFixed(2) }%.  Mide la rentabilidad del patrimonio de los accionistas. Un ROE más alto indica que la empresa está utilizando eficientemente el dinero de los inversores para generar ganancias.`;
        analisisLiquidez.textContent = `La liquidez corriente es de ${ indicadores.liquidezCorriente.toFixed(2) }.  Muestra la capacidad de la empresa para pagar sus obligaciones a corto plazo. Un valor mayor a 1 generalmente indica una buena salud financiera a corto plazo.`;
    }

    function crearGrafico(resultados) {
        const ctx = document.getElementById('graficoResultados').getContext('2d');
        if (graficoResultados) {
            graficoResultados.destroy();
        }

        graficoResultados = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ventas', 'Costo de Ventas', 'Ganancia Bruta', 'Gastos Operativos', 'Ganancia Operativa', 'Gastos por Intereses', 'Ganancia Antes de Impuestos', 'Impuestos', 'Ganancia Neta'],
                datasets: [{
                    label: 'Valores',
                    data: [
                        resultados.ventas,
resultados.costoVentas,
                        resultados.gananciaBruta,
                        resultados.gastosOperativos,
                        resultados.gananciaOperativa,
                        resultados.intereses,
                        resultados.gananciaAntesImpuestos,
                        resultados.impuestos,
                        resultados.gananciaNeta,
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Estado de Resultados',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function calcularYMostrarResultados() {
        const ventas = parseFloat(ventasInput.value) || 0;
        const costoVentas = parseFloat(costoVentasInput.value) || 0;
        const gastosOperativos = parseFloat(gastosOperativosInput.value) || 0;
        const intereses = parseFloat(interesesInput.value) || 0;
        const impuestos = parseFloat(impuestosInput.value) || 0.30;
        const activoCorriente = parseFloat(activoCorrienteInput.value) || 0;
        const pasivoCorriente = parseFloat(pasivoCorrienteInput.value) || 0;
        const totalActivos = parseFloat(totalActivosInput.value) || 0;
        const totalPatrimonio = parseFloat(totalPatrimonioInput.value) || 0;

        const estadoResultados = calcularEstadoResultados(ventas, costoVentas, gastosOperativos, intereses, impuestos);
        const balanceGeneral = calcularBalanceGeneral(activoCorriente, pasivoCorriente, totalActivos, totalPatrimonio);
        const indicadores = calcularIndicadoresFinancieros(estadoResultados, balanceGeneral);

        mostrarEstadoResultados(estadoResultados);
        mostrarBalanceGeneral(balanceGeneral);
        mostrarIndicadoresFinancieros(indicadores);
        analizarResultados(indicadores);
        crearGrafico(estadoResultados);
    }

    function limpiarCampos() {
        ventasInput.value = '';
        costoVentasInput.value = '';
        gastosOperativosInput.value = '';
        interesesInput.value = '';
        impuestosInput.value = '';
        activoCorrienteInput.value = '';
        pasivoCorrienteInput.value = '';
        totalActivosInput.value = '';
        totalPatrimonioInput.value = '';

        ventasResult.textContent = '';
        costoVentasResult.textContent = '';
        gananciaBrutaResult.textContent = '';
        gastosOperativosResult.textContent = '';
        gananciaOperativaResult.textContent = '';
        interesesResult.textContent = '';
        gananciaAntesImpuestosResult.textContent = '';
        impuestosResult.textContent = '';
        gananciaNetaResult.textContent = '';
        activoCorrienteResult.textContent = '';
        pasivoCorrienteResult.textContent = '';
        totalActivosResult.textContent = '';
        totalPatrimonioResult.textContent = '';

        margenGananciaBrutaResult.textContent = '';
        margenGananciaNetaResult.textContent = '';
        rotacionActivosResult.textContent = '';
        roaResult.textContent = '';
        roeResult.textContent = '';
        liquidezCorrienteResult.textContent = '';

        analisisMargenBruto.textContent = '';
        analisisMargenNeto.textContent = '';
        analisisRotacionActivos.textContent = '';
        analisisROA.textContent = '';
        analisisROE.textContent = '';
        analisisLiquidez.textContent = '';

        if (graficoResultados) {
            graficoResultados.destroy();
        }
    }

    calcularBtn.addEventListener('click', calcularYMostrarResultados);
    limpiarBtn.addEventListener('click', limpiarCampos);