import React, { useState } from "react";
import { Button, Modal } from "rsuite";
import { FlexboxGrid, Icon, Footer, Grid, Container } from "rsuite";
import Gota from "../../images/gota.svg";

const SharedFooter = () => {
  const [modal, setModal] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [gota, setGota] = useState(false);

  const [legal, setLegal] = useState(false);
  const [cookies, setCookies] = useState(false);
  return (
    <>
      <Footer className="footer">
        <Grid>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={6}>
              {/* <Divider /> */}
              <p>
                <a
                  className="footer-link"
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPrivacy(true);
                  }}
                >
                  Políticas de privacidad
                </a>{" "}
                | &nbsp;
                <a
                  href="#"
                  className="footer-link"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setCookies(true);
                  }}
                >
                  Cookies
                </a>
              </p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={3} className="social-links">
              <a
                href="https://www.facebook.com/RenaultArgentina"
                target="_blank"
              >
                <Icon icon="facebook-official" />
              </a>
              <a
                href="https://www.instagram.com/renaultarg/?hl=es"
                target="_blank"
              >
                <Icon icon="instagram" />
              </a>
              <a href="https://twitter.com/RenaultArg" target="_blank">
                <Icon icon="twitter" />
              </a>
              <a
                href="https://www.linkedin.com/company/renault/"
                target="_blank"
              >
                <Icon icon="linkedin" />
              </a>

              <a href="#" onClick={() => setGota(true)}>
                <img
                  src={Gota}
                  alt="gota"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                ></img>
              </a>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Grid>
      </Footer>
      <Modal size="md" show={gota} onHide={() => setGota(false)}>
        <Modal.Header>
          <Modal.Title>Realizado por Gota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            <img
              src={Gota}
              alt="gota"
              style={{
                width: 150,
              }}
            ></img>
          </p>
          <p>
            La creatividad, diseño, ilustración y desarrollo de este juego fue
            realizado por Gota, un estudio de comunicación profesional que
            cuenta con un equipo creativo conformado por personas con
            discapacidad intelectual.
          </p>

          <p>
            <a href="http://www.somosgota.com">www.somosgota.com</a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setGota(false)} appearance="subtle">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="md" show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Bases y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModal(false)} appearance="subtle">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="md" show={privacy} onHide={() => setPrivacy(false)}>
        <Modal.Header>
          <Modal.Title>Políticas de Privacidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            La presente Política de Privacidad aplica a Renault Argentina S.A. y
            sus sociedades vinculadas: i) Plan Rombo S.A. de Ahorro Para Fines
            Determinados; ii) Centro Automotores S.A., iii) Courtage S.A., iv)
            RCI Banque Suc. Argentina, v) Rombo Compañía Financiera S.A., vi)
            Fundación Renault y vii) Cormasa S.A. (en adelante “Renault
            Argentina”). Esta Política de Privacidad describe el modo en el que
            Renault Argentina recopila, almacena y utiliza la información sobre
            las personas que visitan este sitio web. AL UTILIZAR ESTE SITIO WEB,
            APRUEBA LA RECOPILACIÓN Y EL USO DE SUS DATOS PERSONALES COMO SE
            ESTABLECE EN ESTA POLITICA DE PRIVACIDAD. TAMBIÉN RECONOCE QUE
            RENAULT ARGENTINA PUEDE CAMBIAR, MODIFICAR, AÑADIR, ELIMINAR O
            ACTUALIZAR DE CUALQUIER OTRO MODO ESTA POLÍTICA DE PRIVACIDAD, SEGÚN
            CONSIDERE, SIN AVISO PREVIO. Sin embargo, siempre se tratará su
            información personal de acuerdo con la Política de Privacidad
            vigente en el momento de su recopilación. Nuestra intención es
            publicar los cambios de la Política de Privacidad en esta página,
            para que usted disponga de toda la información acerca de los tipos
            de información que recopilamos, el modo en el que la utilizamos y
            las circunstancias en las que se puede divulgar. Nuestra Política de
            Privacidad se encuentra en nuestra página principal, así como en
            cualquier página en la que se soliciten Datos Personales. En todas
            las secciones en las que se recaben Datos Personales, se
            proporcionará, de ser necesaria, una explicación ampliada sobre los
            fines para los cuales se utilizarán los datos solicitados.1.
            Compromiso de privacidadEl término “Datos Personales”, tal como se
            emplea en esta Política de Privacidad, hace referencia a la
            información que puede utilizarse para identificarlo, como su nombre,
            fecha de nacimiento, dirección de correo electrónico, dirección
            postal o número de teléfono. Generalmente, procesaremos los Datos
            Personales exclusivamente como se describe en esta Política de
            Privacidad. Sin embargo, nos reservamos el derecho de llevar a cabo
            un procesamiento adicional en la medida en la que lo permita o lo
            requiera la legislación o como complemento de alguna investigación
            jurídica o penal.La siguiente sección explica cómo y dónde
            recopilamos sus Datos Personales.2. Uso previsto de los Datos
            PersonalesLa mayoría de nuestros servicios no requieren ningún tipo
            de registro, lo que le permitirá visitar nuestra página web sin
            necesidad de identificarse. Sin embargo, algunos de los servicios le
            pedirán que nos proporcione sus Datos Personales. En estas
            situaciones, si elige no proporcionarnos sus Datos Personales
            solicitados, puede que no tenga acceso a algunas secciones de la
            página web y que nosotros no podamos responder a su consulta.Todos
            los Datos Personales recabados a través de esta página web se
            incluirán en una base de datos de titularidad de Renault Argentina
            S.A. o sus sociedades vinculadas, con el objetivo de proporcionarle
            y/o facturarle los productos o servicios que haya solicitado, así
            como para mantenerle informado, incluso por medios electrónicos,
            sobre productos y servicios de Renault Argentina que consideramos
            que pueden ser de su interés. En todo caso, la utilización de sus
            datos para cualquier otra finalidad le será comunicada antes de
            proceder a su tratamiento.3. Confidencialidad de Datos PersonalesNos
            comprometemos a no vender, difundir o distribuir de ningún otro modo
            sus Datos Personales a terceros, excepto en los casos dispuestos en
            la presente Política de Privacidad. En este sentido, usted consiente
            que podamos ceder sus Datos Personales entre las compañías
            vinculadas de Renault Argentina que se comprometan a tratarlos de
            conformidad con la presente Política de Privacidad. Asimismo, los
            Datos Personales se pueden transferir a terceros que actúen en
            nuestro nombre para que los procesen de conformidad con los fines
            para los que se recopilaron originalmente o pueden procesarse de
            otro modo legal, como prestación de servicios, evaluación de la
            utilidad del sitio web, marketing, gestión de datos o asistencia
            técnica. Estos terceros han suscrito un contrato con nosotros para
            utilizar exclusivamente los Datos Personales para los fines
            acordados y no vender ni divulgar sus Datos Personales a otros
            terceros, salvo que lo requiera la legislación, lo permitamos
            nosotros o se indique en esta Política de Privacidad.Asimismo, sus
            Datos Personales recopilados pueden transferirse a terceros en caso
            de que el negocio relacionado con esta página web y los datos de los
            clientes relacionados con él se vendan, adjudiquen o cedan de forma
            total o parcial; en tal caso, le pediríamos al comprador,
            adjudicatario o cesionario que trate los Datos Personales de acuerdo
            con esta Política de Privacidad. Asimismo, los Datos Personales
            podrán divulgarse a terceros si fuéramos requeridos para actuar de
            este modo con base en la legislación vigente, una orden judicial o
            un reglamento gubernamental o si dicha divulgación fuera necesaria,
            de algún otro modo, para respaldar una investigación o un
            procedimiento judicial o penal aquí o en el extranjero.4. Derecho de
            acceso, rectificación y supresiónSiempre que procesamos Datos
            Personales, tomamos las medidas razonables para garantizar que sus
            Datos Personales se mantengan precisos y actualizados para los fines
            para los que fueron recopilados.De conformidad con la Ley Nº 25.326
            de Protección de los Datos Personales, usted tiene la facultad de
            ejercer el derecho de acceso a los mismos en forma gratuita a
            intervalos no inferiores a seis meses, salvo que acredite un interés
            legítimo al efecto conforme lo establecido en el artículo 14, inciso
            3 de la ley 25.326. Asimismo, podrá ejercer los derechos de
            rectificación y supresión.Si desea ponerse en contacto con nosotros
            respecto a nuestro uso de sus Datos Personales o bien ejercer sus
            derechos de acceso, rectificación y supresión al tratamiento de sus
            Datos Personales, por favor envíe un correo electrónico y/o
            contáctese con el sitio web, según corresponda y de acuerdo al
            siguiente detalle: (i) Renault Argentina S.A.:
            src-renault.argentina@renault.com; (ii) Plan Rombo S.A. de Ahorro
            Para Fines Determinados: www.planrombo.com.ar/clientes; (iii) Centro
            Automotores S.A.: asistenciaclientes@centroautomotores.com; (iv)
            Courtage S.A.: courtage.seguros@rcibanque.com; (v) RCI Banque Suc.
            Argentina: rci_credito_red@rcibanque.com; (vi) Rombo Compañía
            Financiera S.A.: servicioaclientes@renaultcredit.com.ar; (vii)
            Fundación Renault: fundacion.renault@renault.com; (viii) Cormasa
            S.A.: src-renault.argentina@renault.com; o envíe una comunicación
            escrita a Renault Argentina S.A., Fray Justo Santa María de Oro
            1744, Ciudad Autónoma de Buenos Aires, C.P: 1414. Si se pone en
            contacto con nosotros, indique el nombre del sitio web en el que
            introdujo sus datos y acompañe una copia de su documento nacional de
            identidad, pasaporte u otro documento válido que lo identifique, así
            como la información específica que quiere que corrijamos,
            actualicemos o eliminemos. Las solicitudes para suprimir Datos
            Personales estarán sujetas a cualquier obligación legal y ética
            vigente de informar o cumplimentar documentos u obligaciones de
            retención documental que nos sean impuestas.Ponemos en su
            conocimiento que la DIRECCION NACIONAL DE PROTECCION DE DATOS
            PERSONALES, Órgano de Control de la Ley Nº 25.326, tiene la
            atribución de atender las denuncias y reclamos que se interpongan
            con relación al incumplimiento de las normas sobre protección de
            datos personales. 5. Seguridad y confidencialidadRenault Argentina
            ha adoptado y mantiene las medidas de seguridad, administrativas,
            técnicas y físicas, necesarias y razonables para proteger sus Datos
            Personales contra daño, pérdida, alteración, destrucción o el uso,
            acceso o tratamiento no autorizados. Procuramos que las medidas de
            seguridad adoptadas sean las adecuadas para mantener correctamente
            resguardados sus datos personales.En lo que respecta a la
            información de datos personales sensibles, hacemos los esfuerzos
            razonables con el fin que se limite el periodo del tratamiento y
            siempre apegados a la finalidad para los cuales se recaban.6.
            Transferencia internacional de datosRenault Argentina forma parte
            del Grupo Renault, un grupo global de empresas que dispone de bases
            de datos en diferentes países; algunas de las cuales están
            gestionadas por terceros en nombre de la compañía local del Grupo
            Renault. Por este motivo, podremos transferir sus Datos Personales a
            una de las bases de datos del Grupo fuera de su país de residencia,
            lo cual incluye la posibilidad de que se transfieran a países que
            pueden no ofrecer un nivel adecuado de protección de sus Datos
            Personales, en comparación con la seguridad proporcionada en su
            país.En caso de que el nivel de protección de privacidad en un país
            concreto no sea adecuado conforme la normativa vigente, adoptaremos
            las medidas apropiadas para garantizar que la información
            transferida cuente con la adecuada protección y el tratamiento de
            datos cumpla con los requisitos de la normativa vigente. Para más
            información acerca de cómo sus Datos Personales pueden ser
            transferidos a jurisdicciones fuera de la Argentina, por favor
            póngase en contacto con nosotros utilizando la información de
            contacto provista al final de esta política.7. Cookies y etiquetas
            de internetPodremos recopilar y procesar información sobre su visita
            a este sitio web, como las páginas que visita, el sitio web desde el
            que accede y algunas búsquedas que realiza. Dicha información se
            emplea para ayudarnos a mejorar el contenido del sitio y recopilar
            estadísticas totales sobre las personas que utilizan nuestro sitio
            web para uso interno y de investigación de mercado. Para ello,
            instalaremos cookies que recopilen el nombre del dominio de usuario,
            su proveedor de servicios de internet, su sistema operativo y la
            fecha y la hora de acceso. Una cookie es una información que se
            envía a su navegador y se almacena en el disco duro de su ordenador.
            Las cookies no dañan su ordenador. Puede configurar su navegador
            para que le notifique cuando reciba una cookie, lo cual le permitirá
            decidir si desea aceptarla o no. Si no desea que instalemos cookies,
            envíenos un correo electrónico a y/o contáctese con el sitio web,
            según corresponda y de acuerdo al siguiente detalle: (i) Renault
            Argentina S.A.: src-renault.argentina@renault.com; (ii) Plan Rombo
            S.A. de Ahorro Para Fines Determinados:
            www.planrombo.com.ar/clientes; (iii) Centro Automotores S.A.:
            asistenciaclientes@centroautomotores.com; (iv) Courtage S.A.:
            courtage.seguros@rcibanque.com; (v) RCI Banque Suc. Argentina:
            rci_credito_red@rcibanque.com; (vi) Rombo Compañía Financiera S.A.:
            servicioaclientes@renaultcredit.com.ar; (vii) Fundación Renault:
            fundacion.renault@renault.com; (viii) Cormasa S.A.:
            src-renault.argentina@renault.com. No obstante, le informamos de que
            puede que no logre utilizar todas las funciones de su software de
            navegación si no acepta. Podremos contar con los servicios de
            terceros para ayudarnos a recopilar y procesar la información
            descrita en este apartado.De manera ocasional, podremos emplear
            etiquetas de internet (conocidas como etiquetas de acción, GIF de un
            sólo píxel, GIF transparentes, GIF invisibles y GIF 1×1) y cookies
            en este sitio y podremos utilizar dichas etiquetas/cookies mediante
            un tercero proveedor de servicios de publicidad o un tercero
            proveedor de servicios de análisis web que podría conservar la
            información correspondiente (incluida su dirección IP) en un país
            extranjero. Estas etiquetas/cookies se encuentran en anuncios en
            línea que atraen usuarios a este sitio web y a diversas páginas de
            este sitio. Empleamos esta tecnología para medir las respuestas de
            los visitantes a nuestros sitios web y la eficacia de nuestras
            campañas de publicidad (incluidas las veces que se abre una página y
            qué información se consulta) y para evaluar el uso de este sitio web
            por su parte. El tercero proveedor de servicios de publicidad o el
            tercero proveedor de servicios de análisis web podrá recopilar datos
            sobre los visitantes de nuestro sitio u otros sitios gracias a estas
            etiquetas de internet/cookies, podrá redactar informes para nosotros
            sobre la actividad del sitio web y proporcionar más servicios
            relacionados con el uso de este sitio web e internet. Podrán
            proporcionar tal información a otras partes si media un
            requerimiento judicial o si contratan a terceros para que procesen
            la información en su nombre.8. Google AnalyticsUtilizamos “Google
            Analytics” para racionalizar nuestra cartera de sitios web (i)
            optimizando el tráfico hacia y entre sitios web corporativos e (ii)
            integrando y optimizando páginas web, si procede. “Google Analytics”
            es un servicio ofrecido por Google Inc. (Google en adelante), que
            genera estadísticas detalladas sobre el tráfico de un sitio web y
            los orígenes del tráfico y mide las conversiones y las ventas.
            “Google Analytics” emplea cookies almacenadas en su ordenador para
            analizar el modo en el que los usuarios utilizan nuestro sitio
            web.La información generada por las cookies sobre su uso del sitio
            web, incluida su dirección IP, se convertirá en anónima mediante el
            uso de los ajustes adecuados (función “_anonymizelp ()” o
            equivalente) y se transmitirá a los servidores de Google de los
            Estados Unidos.En nuestro nombre, Google empleará la información
            generada por las cookies para evaluar el uso de nuestro sitio web,
            recopilar informes sobre la actividad del sitio web y nos
            proporcionará dichos informes para fines analíticos.Google podrá
            ceder esta información a terceros en caso de una obligación legal o
            si un tercero procesa los datos en nombre de Google. Google no
            combinará ni asociará, en ningún caso, su dirección IP a otros datos
            almacenados por él.Podrá evitar o detener la instalación y el
            almacenamiento de cookies mediante la configuración de su navegador
            descargando e instalando el Complemento de inhabilitación para
            navegadores de Google Analytics gratuito, disponible en
            https://tools.google.com/dlpage/gaoptout?hl=en (el enlace es
            externo).Le informamos de que, en tal caso, no podrá utilizar
            íntegramente todas las funciones de nuestro sitio web.Al utilizar
            nuestro sitio web, da su consentimiento para procesar cualquier dato
            personal que Google recopile del modo y para los fines descritos
            anteriormente.9. Enlaces a otras páginas webEsta Política de
            Privacidad se aplica únicamente a este sitio web y/o sitios web de
            Renault Argentina y no a las páginas web propiedad de terceros.
            Podremos facilitar enlaces a otros sitios web que consideramos de
            interés para nuestros visitantes. Nuestro deseo es garantizar que
            dichas páginas web mantenga los estándares más elevados. Sin
            embargo, debido a propia la naturaleza de internet, no podemos
            garantizar los estándares de privacidad de sitios web de los que
            proporcionamos el enlace o hacernos responsables de los contenidos
            de otros sitios que no sean de nuestra titularidad, por lo que, esta
            Política de Privacidad no se aplicará a ningún sitio enlazado que no
            pertenezca a Renault Argentina.10. ContactoSi tiene alguna consulta
            o reclamo sobre el cumplimiento de esta Política de Privacidad o si
            le gustaría hacer alguna recomendación o comentario para mejorar la
            calidad de la Política de Privacidad, envíenos un correo electrónico
            y/o contáctese con el sitio web, según corresponda y de acuerdo al
            siguiente detalle: (i) Renault Argentina S.A.:
            src-renault.argentina@renault.com; (ii) Plan Rombo S.A. de Ahorro
            Para Fines Determinados: www.planrombo.com.ar/clientes; (iii) Centro
            Automotores S.A.: asistenciaclientes@centroautomotores.com; (iv)
            Courtage S.A.: courtage.seguros@rcibanque.com; (v) RCI Banque Suc.
            Argentina: rci_credito_red@rcibanque.com; (vi) Rombo Compañía
            Financiera S.A.: servicioaclientes@renaultcredit.com.ar; (vii)
            Fundación Renault: fundacion.renault@renault.com; (viii) Cormasa
            S.A.: src-renault.argentina@renault.com.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setPrivacy(false)} appearance="subtle">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="md" show={cookies} onHide={() => setCookies(false)}>
        <Modal.Header>
          <Modal.Title>Cookies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Renault y sus sociedades vinculadas pueden usar "cookies" para
            rastrear preferencias de usuarios, alcanzar un mejor diseño de su
            sitio web y procurar una navegación más ágil. También podrán ser
            utilizadas para realizar en el futuro campañas publicitarias
            tendientes a mantener actualizado al usuario sobre nuevos productos,
            promociones y/o distintos servicios que ofrezca por si, o a través
            de terceras personas.Los cookies permiten adaptar el contenido de
            nuestras páginas de Internet a sus necesidades específicas y así
            también mejorar el servicio que le ofrecemos. Las cookies también
            pueden ser usadas para determinar si una conexión ya ha sido hecha
            de su ordenador a nuestros sitios. Desde luego, usted también puede
            ver nuestro sitio web sin ninguna "cookie". La mayoría de los
            navegadores aceptan "cookies" automáticamente. Usted puede impedir
            el uso de "cookies" seleccionando la opción “no aceptar cookies” de
            su explorador. También puede visitar www.aboutcookies.org, que
            contiene información detallada de cómo hacerlo en una amplia
            variedad de navegadores.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setCookies(false)} appearance="subtle">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="md" show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Bases y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModal(false)} appearance="subtle">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default SharedFooter;
