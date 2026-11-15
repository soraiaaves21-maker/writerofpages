import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL = "https://nggbfllcexievbgpfami.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sb0vDaKqP1xlcx5gsiCwgA_aexx6pIO";



const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('Conexão com Supabase iniciada:', supabase);
supabase.auth.getSession().then(({ data, error }) => {
    console.log('Teste de conexão:', error ? error.message : 'Concluído');
});
supabase
    .from('perfis')
    .select('id')
    .limit(1)
    .then(({ data, error }) => {
        console.log('Teste da tabela perfis:', error ? error.message : 'Consulta concluída');
    });
const formularioCadastro = document.getElementById('cadastro-form');

if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const mensagem = document.getElementById('mensagem');

        mensagem.textContent = 'Criando sua conta...';
        const { error } = await supabase.auth.signUp({
    email: email,
    password: senha,
    options: {
        data: { nome: nome },
        emailRedirectTo: 'https://soraiaaves21-maker.github.io/writerofpages/'
    }
});

        if (error) {
            mensagem.textContent = 'Erro: ' + error.message;
        } else {
            mensagem.textContent = 'Cadastro iniciado! Confira seu e-mail para confirmar a conta.';
        }
    });
}

const formularioLogin = document.getElementById('login-form');

if (formularioLogin) {
    formularioLogin.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const mensagem = document.getElementById('mensagem');

        mensagem.textContent = 'Verificando seu acesso...';

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            mensagem.textContent = 'Não foi possível entrar: ' + error.message;
        } else {
            window.location.href = 'inicio.html';
        }
    });
}