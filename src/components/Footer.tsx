import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FitAI</h3>
            <p>Plataforma de fitness com IA</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul>
              <li>Treino IA</li>
              <li>Scanner Nutricional</li>
              <li>IA Coach</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul>
              <li>FAQ</li>
              <li>Contato</li>
              <li>Privacidade</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 FitAI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer