<?php
$titulo = 'TechFix - Home';
$css = ['../../assets/css/home.css'];
$js = ['../../assets/js/home.js'];
$paginaAtual = 'inicio';
require __DIR__ . '/../partials/header.php';
?>
    <main>
      <section id="banr_home">
        <span class="hero-glow g1"></span>
        <span class="hero-glow g2"></span>

        <div id="img_banr">
          <img src="../../assets/img/banner1.png" alt="Profissional de manutenção" />
          <div class="hero-chip">
            <i class="ri-shield-check-fill"></i> Profissionais verificados
          </div>
        </div>

        <div id="text_banr">
          <span class="hero-badge"
            ><i class="ri-tools-line"></i> Manutenção &amp; Reparo</span
          >
          <p id="headerNome" class="hero-saudacao">Olá, precisa de ajuda?</p>
          <h1>Manutenção e reparo <span class="grad">sob medida</span></h1>
          <p>
            Se você precisa de assistência com reparos ou manutenção, estamos
            aqui para ajudar! Entre em contato e descubra como podemos resolver
            seus problemas de forma rápida e eficiente.
          </p>
          <div class="hero-cta">
            <a href="servico.php"
              ><button class="btn">VER SERVIÇOS</button></a
            >
            <a href="servico.php"
              ><button class="btn btn-ghost">CONTRATAR AGORA</button></a
            >
          </div>
        </div>
      </section>

      <section class="servicos">
        <h2>Nossos Serviços de Manutenção e Reparo</h2>
        <p>
          Estamos aqui para garantir que sua casa ou empresa funcione
          perfeitamente. Confira nossos serviços especializados:
        </p>
        <div class="alinha">
          <div class="container_serviços">
            <div class="card autoShow">
              <i class="ri-building-line"></i>
              <h3>Manutenção Predial:</h3>
              <p>
                Cuidamos de todos os aspectos estruturais e funcionais do seu
                prédio.
              </p>
            </div>
            <div class="card autoShow">
              <i class="ri-macbook-line"></i>
              <h3>Manutenção de Computadores:</h3>
              <p>Garantimos que seus dispositivos operem com eficiência e segurança.</p>
            </div>
            <div class="card autoShow">
              <i class="ri-computer-line"></i>
              <h3>Reparo de Eletrodomésticos:</h3>
              <p>
                Reparos rápidos e eficazes para garantir o funcionamento
                dos seus dispositivos.
              </p>
            </div>
            <div class="card autoShow">
              <i class="ri-roadster-line"></i>
              <h3>Manutenção de Veículos:</h3>
              <p>Serviços de manutenção para manter seu carro em ótimas condições.</p>
            </div>
            <div class="card autoShow">
              <i class="ri-server-line"></i>
              <h3>Manutenção de Equipamentos Industriais:</h3>
              <p>
                Soluções para garantir a eficiência e a segurança das suas
                máquinas.
              </p>
            </div>
            <div class="card autoShow">
              <i class="ri-paint-brush-line"></i>
              <h3>Serviços de Pintura:</h3>
              <p>Transforme seus espaços com um acabamento profissional.</p>
            </div>
            <div class="card autoShow">
              <i class="ri-radar-line"></i>
              <h3>Manutenção de Sistemas Elétricos:</h3>
              <p>
                Inspeção e reparo de instalações elétricas para garantir
                segurança e eficiência.
              </p>
            </div>
            <div class="card autoShow">
              <i class="ri-building-line"></i>
              <h3>Manutenção Predial:</h3>
              <p>
                Cuidamos de todos os aspectos estruturais e funcionais do seu
                prédio.
              </p>
            </div>
            <div class="card autoShow">
              <i class="ri-macbook-line"></i>
              <h3>Manutenção de Computadores:</h3>
              <p>Garantimos que seus dispositivos operem com eficiência e segurança.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sec_beneficios">
        <div class="container" id="cont_beneficios">
          <div class="anos autoShow">
            <p class="stat-num" data-count="3">3</p>
            <p class="stat-label">Anos de Experiência</p>
          </div>
          <div class="beneficios">
            <div class="card_retangulo autoShow">
              <p class="stat-num" data-count="600" data-suffix="+">600+</p>
              <p>Clientes</p>
            </div>
            <div class="card_retangulo autoShow">
              <p class="stat-num" data-count="12" data-suffix="+">12+</p>
              <p>Projetos Concluídos</p>
            </div>
            <div class="card_retangulo autoShow">
              <p class="stat-num" data-count="10">10</p>
              <p>Conquistas</p>
            </div>
            <div class="card_retangulo autoShow">
              <p class="stat-num" data-count="40" data-suffix="+">40+</p>
              <p>Inscritos</p>
            </div>
          </div>
        </div>
      </section>

      <section id="Titulo_projetos" class="container">
        <div class="frase" id="frase1">
          <div>
            <h2>O que fazemos por você</h2>
            <p>Alguns serviços à sua disposição:</p>
          </div>
        </div>
      </section>

      <section id="Projetos">
        <div class="container" id="cont_projetos">
          <div class="card_projetos autoShow">
            <div class="card_img">
              <img
                src="../../assets/img/Projetos/Agendamento.jpg"
                alt="Projeto de Sucesso"
              />
            </div>
            <h3>Agendamento Online</h3>
            <a href="cadastro.php">SAIBA MAIS</a>
          </div>
          <div class="card_projetos">
            <div class="card_img autoShow">
              <img src="../../assets/img/Projetos/podcast.jpg" alt="Projeto de Sucesso" />
            </div>
            <h3>Blog de Dicas e Tutoriais</h3>
            <a href="cadastro.php">SAIBA MAIS</a>
          </div>
          <div class="card_projetos">
            <div class="card_img autoShow">
              <img
                src="../../assets/img/Projetos/Ligação com o cliente.jpg"
                alt="Projeto de Sucesso"
              />
            </div>
            <h3>Área do Cliente</h3>
            <a href="cadastro.php">SAIBA MAIS</a>
          </div>
          <div class="card_projetos">
            <div class="card_img autoShow">
              <img
                src="../../assets/img/Projetos/Contrução.jpg"
                alt="Projeto de Sucesso"
              />
            </div>
            <h3>Catálogo de Serviços</h3>
            <a href="cadastro.php">SAIBA MAIS</a>
          </div>
          <div class="card_projetos">
            <div class="card_img autoShow">
              <img
                src="../../assets/img/Projetos/Suporte ao Cliente.jpg"
                alt="Projeto de Sucesso"
              />
            </div>
            <h3>Suporte ao Cliente</h3>
            <a href="cadastro.php">SAIBA MAIS</a>
          </div>
          <div class="card_projetos">
            <div class="card_img autoShow">
              <img
                src="../../assets/img/Projetos/Depoimentos.jpg"
                alt="Projeto de Sucesso"
              />
            </div>
            <h3>Depoimentos de Clientes</h3>
            <a href="cadastro.php">SAIBA MAIS</a>
          </div>
        </div>
      </section>
    </main>

<?php require __DIR__ . '/../partials/footer.php'; ?>
