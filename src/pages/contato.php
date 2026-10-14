<?php
$titulo = 'TechFix - Contato';
$css = ['../../assets/css/contato.css'];
$js = ['../../assets/js/faq.js', '../../assets/js/contato.js'];
$paginaAtual = 'contato';
require __DIR__ . '/../partials/header.php';
?>
    <!-- BANNER -->
    <section id="banner">
      <span class="hero-glow g1"></span>
      <span class="hero-glow g2"></span>
      <span class="hero-badge"
        ><i class="ri-customer-service-2-fill"></i> Suporte TechFix</span
      >
      <h1>Quer <span class="grad">entrar em contato?</span></h1>
      <p>
        Adoraríamos ouvir você. Tire dúvidas, envie sugestões ou peça ajuda —
        respondemos em até 48 horas.
      </p>
    </section>

    <!-- CONTATO -->
    <div class="alinha">
      <section class="card" role="main">
        <aside class="contact-side">
          <a
            class="contact-card"
            href="mailto:TechFix@gmail.com"
            aria-label="Enviar e-mail para a TechFix"
          >
            <div class="icon"><i class="ri-mail-line"></i></div>
            <div>
              <div class="small">E-mail</div>
              <div class="valor">TechFix@gmail.com</div>
            </div>
          </a>
          <a
            class="contact-card"
            href="tel:+5511970184779"
            aria-label="Ligar para a TechFix"
          >
            <div class="icon"><i class="ri-phone-line"></i></div>
            <div>
              <div class="small">Número</div>
              <div class="valor">+55 (11) 97018-4779</div>
            </div>
          </a>
          <div class="contact-card">
            <div class="icon"><i class="ri-map-pin-line"></i></div>
            <div>
              <div class="small">Localização</div>
              <div class="valor">São Paulo, BR</div>
            </div>
          </div>
        </aside>
        <form id="contactForm" novalidate>
          <div class="row">
            <div class="field" id="campo_name">
              <label for="name">Nome *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                required
              />
              <span class="field-erro" id="erro_name"></span>
            </div>
            <div class="field" id="campo_email">
              <label for="email">E-mail *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="voce@exemplo.com"
                required
              />
              <span class="field-erro" id="erro_email"></span>
            </div>
          </div>
          <div class="field">
            <label for="subject">Assunto</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Sobre o que é?"
            />
          </div>
          <div class="field" id="campo_message">
            <label for="message">Mensagem *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escreva sua mensagem..."
              required
            ></textarea>
            <span class="field-erro" id="erro_message"></span>
          </div>
          <div class="submit-area">
            <div class="meta">
              <i class="ri-lock-2-line"></i> Suas informações são confidenciais
              • Resposta em até 48 horas
            </div>
            <button class="btn" type="submit" id="bnt_enviar">
              ENVIAR MENSAGEM
            </button>
          </div>
          <div id="success" class="success" role="status">
            <i class="ri-checkbox-circle-fill"></i>
            <span>Mensagem enviada com sucesso — obrigado!</span>
          </div>
        </form>
      </section>
    </div>

    <!-- FAQ -->
    <section id="faq">
      <div class="card_faq">
            <h2>Perguntas Frequentes</h2>
        <p>Encontre respostas para as perguntas mais comuns aqui:</p>
      </div>

      <div class="faq_card">
        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Como funciona a contratação de um profissional?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Acesse a página de serviços, filtre pela categoria desejada e
                escolha o profissional pelo perfil. Ao clicar em "Contratar",
                você selecionará a data e a forma de pagamento. O agendamento é
                confirmado quando o profissional aceita sua solicitação, e você
                recebe um e-mail de confirmação.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Quais tipos de serviços a TechFix oferece?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Trabalhamos com cinco categorias: manutenção predial, serviços
                de TI, reparo de eletrodomésticos, manutenção de veículos e
                manutenção de equipamentos industriais. Todos os profissionais
                disponíveis podem ser encontrados na página de serviços.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Como os preços são definidos?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Cada profissional define seu próprio valor por dia de trabalho,
                que aparece no perfil e na listagem de serviços. Se quiser
                negociar condições específicas, você pode falar diretamente com
                o profissional pelos contatos exibidos no perfil dele.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Como funciona o agendamento?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Após escolher o profissional, você seleciona a data no
                calendário e envia a solicitação. O agendamento fica pendente
                até a confirmação do profissional — quando isso acontece, um
                e-mail é enviado para você com todos os detalhes.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Quais formas de pagamento são aceitas?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Aceitamos cartões de crédito e débito, Pix e transferências
                bancárias, com opção de parcelamento em condições especiais. A
                forma de pagamento é escolhida no momento da contratação, mas o
                valor só é cobrado após a conclusão total do serviço.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Posso cancelar ou remarcar um agendamento?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Sim. Cancelamentos podem ser feitos com pelo menos um dia de
                antecedência. Cancelamentos tardios podem resultar em cobrança
                parcial. Caso o cancelamento parta da empresa ou do
                profissional, o serviço é reagendado sem nenhum custo para
                você.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Como os profissionais são selecionados e verificados?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Antes de entrar na plataforma, cada profissional passa por
                verificação de identidade, certificações e experiência. Além
                disso, os perfis exibem avaliações reais de outros clientes,
                para que você decida com segurança.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Como funcionam as avaliações?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Após a conclusão do serviço, você pode avaliar o profissional
                com nota e comentário. As avaliações aparecem no perfil dele,
                junto com as notas de outros clientes, ajudando toda a
                comunidade a contratar com mais confiança.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>E se eu tiver um problema depois do serviço?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Se algo não saiu como esperado, entre em contato com o
                profissional pelos canais exibidos no perfil dele ou com nossa
                equipe pelos canais desta página. Vamos acompanhar o caso e
                ajudar na solução — o suporte pós-serviço faz parte do nosso
                compromisso.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Em quais regiões a TechFix atende?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Atendemos em todo o Brasil por meio de profissionais parceiros.
                Os perfis recomendados são selecionados automaticamente com
                base na sua localização, para priorizar quem está mais perto de
                você.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Preciso criar uma conta para contratar?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Você pode navegar pelos serviços sem conta, mas recomendamos
                criar um cadastro gratuito: assim é possível agendar serviços,
                acompanhar o status das contratações e avaliar os profissionais
                depois da conclusão.
              </p>
            </div>
          </div>
        </div>

        <div class="faq" role="button" tabindex="0" aria-expanded="false">
          <div class="pergunta">
            <h3>Em quanto tempo vocês respondem minha mensagem?</h3>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="resposta">
            <div class="resposta_inner">
              <p>
                Nossa equipe responde todas as mensagens em até 48 horas,
                incluindo fins de semana e feriados. Para assuntos urgentes,
                prefira ligar para o nosso número — o atendimento é mais
                rápido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->

<?php require __DIR__ . '/../partials/footer.php'; ?>
