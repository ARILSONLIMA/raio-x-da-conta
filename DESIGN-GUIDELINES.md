# Design Guidelines

## Paleta de Cores (Hexadecimais)
O design será guiado pelas cores oficiais das ODS, balanceadas com tons neutros para garantir a legibilidade do sistema.

* **Primária / ODS 6 (Água):** `#00AEDB` (Cyan) - Uso: Botões principais, Gráficos de Água, Links.
* **Secundária / ODS 7 (Energia):** `#FCC30B` (Amarelo ODS) - Uso: Gráficos de Energia, Badges de destaque.
* **Background App:** `#F8FAFC` (Slate 50) - Fundo geral do painel.
* **Superfícies (Cards):** `#FFFFFF` (Branco).
* **Texto Principal:** `#0F172A` (Slate 900) - Títulos.
* **Texto Secundário:** `#64748B` (Slate 500) - Descrições e labels de formulário.

## Tipografia
* **Fonte Principal:** `Inter` (do Google Fonts). Limpa, profissional e excelente para leitura de dados numéricos.
* **Pesos:** Regular (400) para textos gerais, Medium (500) para botões, Bold (700) para títulos e valores monetários no Dashboard.

## Espaçamento e Estrutura
* Baseado no sistema múltiplo de 4px (padrão Tailwind CSS).
* Paddings internos de Cards: `24px` (`p-6`).
* Gaps entre inputs em formulários: `16px` (`gap-4`).

## Radius / Sombras
* **Border-radius:** `8px` (`rounded-lg` no Tailwind) para botões, inputs e cards. Moderno, mas não excessivamente arredondado.
* **Sombras (Shadows):** Sombras sutis nas superfícies. `box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)` (`shadow-sm`) para inputs, e `shadow-md` para os Cards do Dashboard.

## Guia Shadcn/UI (Sugestão de Componentes)
Se for utilizar React/Next.js com Tailwind, a biblioteca *shadcn/ui* acelera o processo. Use as seguintes predefinições:
* **Card:** Usar o componente `<Card>` para envolver os formulários e os gráficos.
* **Input / Select:** Usar `<Input>` para digitação de valores numéricos e `<Select>` para escolha do Mês e Tipo (Água/Luz).
* **Button:** Usar variant `"default"` (Azul) para submissão e variant `"outline"` para ações secundárias.
* **Chart:** (Se disponível na sua versão do shadcn) usar o *Bar Chart* para plotar os eixos de consumo de forma responsiva.