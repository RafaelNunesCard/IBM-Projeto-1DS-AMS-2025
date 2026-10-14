<?php
$titulo = 'TechFix - Contratar';
$css = ['../../assets/css/contratar.css', '../../assets/css/popups-contratar.css'];
$js = ['../../assets/js/profissionais.js', '../../assets/js/avaliacoes.js', '../../assets/js/popup.js', '../../assets/js/popup-aval.js', '../../assets/js/contratar.js'];
$paginaAtual = '';
require __DIR__ . '/../partials/header.php';
?>
    <main>
      <section class="clt">
        <div class="banner_clt">
          <div class="img_clt">
            <img id="clt_imagem" src="../../assets/img/logo.png" alt="Profissional" />
          </div>

          <div class="nome_clt">
            <h1 id="clt_nome">Carregando...</h1>
            <h2 class="prof">
              <span class="especial">Profissão:</span>
              <span id="clt_cargo">...</span>
            </h2>
            <div
              class="aval_clt1"
              onmouseover="mostrarGrafico(this)"
              onmouseout="esconderGrafico(this)"
            >
              <div class="aval_clt">
                <h3 id="clt_nota">0.0</h3>
                <span class="estrelas" id="clt_estrelas"></span>
                <i class="ri-arrow-down-s-line" id="roda"></i>
              </div>
              <a href="#coment" id="clt_total_avaliacoes"
                >0 Avaliações de Clientes</a
              >

              <div class="grafico" id="clt_grafico"></div>
            </div>

            <p class="clt-projetos" id="clt_projetos">Mais de 0 projetos concluídos</p>

            <div class="direitos" id="clt_selos"></div>
            <div class="bnt_clt">
              <p class="clt-preco" id="clt_preco">R$0,00 por dia</p>
              <a id="bnt_contratar" href="agendamento.php"
                ><button class="btn">CONTRATAR</button></a
              >
            </div>
          </div>
        </div>
      </section>

      <section id="descricao">
        <div class="descricao">
          <div class="desc">
            <h2>Descrição Profissional:</h2>
            <div class="blocos">
              <div class="bloco">
                <i class="ri-user-fill"></i>
                <h3>Biografia</h3>
                <p id="clt_biografia"></p>
              </div>
              <div class="bloco">
                <i class="ri-book-marked-fill"></i>
                <h3>Educação</h3>
                <p id="clt_educacao"></p>
              </div>
              <div class="bloco">
                <i class="ri-phone-fill"></i>
                <h3>Contato</h3>
                <p id="clt_contato"></p>
              </div>
            </div>
          </div>
          <div class="trabalhos">
            <h2>Trabalhos concluídos:</h2>
            <div class="trabalho_img" id="clt_trabalhos"></div>
          </div>
        </div>
      </section>

      <section id="item">
        <div class="venda">
          <div class="desc_img">
            <h2>Item Consertado:</h2>

            <table
              style="width: 100%; border-collapse: collapse; margin-top: 20px"
            >
              <thead>
                <tr style="background-color: #333; color: #fff">
                  <th style="padding: 10px; border: 1px solid #ddd">
                    Recursos
                  </th>
                  <th style="padding: 10px; border: 1px solid #ddd">
                    Especificações
                  </th>
                </tr>
              </thead>
              <tbody id="clt_item_tabela"></tbody>
            </table>
          </div>
          <div class="cont">
            <div class="imgs" id="clt_item_imgs"></div>
            <div class="sobre">
              <h3>Mais informações:</h3>
              <p id="clt_item_sobre"></p>
            </div>
            <div class="alinha">
              <p class="clt-item-preco" id="clt_item_preco"></p>
            </div>
          </div>
        </div>
      </section>

      <section id="coment">
        <div class="coment">
          <div class="avaliacoes">
            <h2>Avaliações de Clientes</h2>
            <div class="aval_clt aval1">
              <span class="estrelas" id="clt_aval_estrelas"></span>
              <h3 id="clt_aval_nota">0.0 of 5</h3>
            </div>
            <div class="grafico1" id="clt_aval_grafico"></div>
            <div class="deixe">
              <h2>Deixe seu feedback</h2>
              <p>Compartilhe sua opinião com outros clientes.</p>
              <button class="btn" id="review">Escrever uma avaliação</button>
            </div>

            <!-- ==================== POPUP ESCREVA SUA AVALIAÇÃO ==================== -->
            <div id="popup-avaliacao" class="popup-avaliacao">
              <div class="popup-avaliacao-content">
                <span class="close-avaliacao">&times;</span>
                <h2>Escreva sua avaliação</h2>
                <form class="form-avaliacao">
                  <label for="nome-avaliacao">Seu nome:</label><br />
                  <input type="text" id="nome-avaliacao" required /><br /><br />

                  <label>Sua avaliação:</label><br />
                  <div class="estrelas-avaliacao">
                    <i class="ri-star-line" data-value="1"></i>
                    <i class="ri-star-line" data-value="2"></i>
                    <i class="ri-star-line" data-value="3"></i>
                    <i class="ri-star-line" data-value="4"></i>
                    <i class="ri-star-line" data-value="5"></i>
                  </div>
                  <br />

                  <label for="comentario-avaliacao">Comentários:</label><br />
                  <textarea
                    id="comentario-avaliacao"
                    rows="5"
                    required
                  ></textarea
                  ><br />

                  <div class="btns-avaliacao">
                    <button type="button" class="cancel-avaliacao">
                      Cancelar
                    </button>
                    <button type="submit" class="enviar-avaliacao">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="comentarios">
            <h2>Principais avaliações</h2>
            <div id="clt_comentarios"></div>
            <a href="#coment"
              >VER MAIS AVALIAÇÕES <i class="ri-arrow-right-s-line"></i
            ></a>
          </div>
        </div>
      </section>
      <div id="popup" class="popup">
        <div class="popup-content">
          <span class="close">&times;</span>
          <h2>Denunciar esta avaliação</h2>
          <h3>Opcional: Por que você está denunciando isso?</h3>
          <form>
            <label class="custom-checkbox">
              <input type="checkbox" class="check-opcao" />
              <span class="checkmark"></span> Não relacionado ao assunto</label
            ><br />
            <label class="custom-checkbox">
              <input type="checkbox" class="check-opcao" />
              <span class="checkmark"></span> Inapropriado</label
            ><br />
            <label class="custom-checkbox">
              <input type="checkbox" class="check-opcao" />
              <span class="checkmark"></span> Falsa</label
            ><br />
            <label class="custom-checkbox">
              <input type="checkbox" class="check-opcao" />
              <span class="checkmark"></span> Outros</label
            ><br />
            <p>
              Vamos verificar se esta avaliação segue nossas Diretrizes da
              Comunidade. Se não seguir, ela será removida.
            </p>
            <div class="alinha">
              <button type="button" class="cancel" onclick="closePopup()">
                Cancelar
              </button>
              <button type="button" class="enviar" onclick="sendFeedback()">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

<?php require __DIR__ . '/../partials/footer.php'; ?>
