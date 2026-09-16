import { usePrevidenciarioModal } from '../context/PrevidenciarioModalContext';

export default function WhatsAppButton() {
  const { openModal } = usePrevidenciarioModal();

  return (
    <button
      onClick={openModal}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group cursor-pointer"
      aria-label="Iniciar Atendimento e Triagem no WhatsApp"
      id="whatsapp-floating-button"
    >
      {/* Pulse Animation Overlay */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>

      {/* SVG Icon */}
      <svg
        className="w-7 h-7 relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.745 1.45 5.436 0 9.86-4.426 9.864-9.864.002-2.635-1.023-5.11-2.884-6.974C16.512 1.899 14.04 .87 11.411.87 5.975.87 1.548 5.297 1.545 10.735c-.001 1.637.425 3.231 1.232 4.637l-.993 3.634 3.72-.976.143.084z" />
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.704 1.447h.006c6.558 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fillRule="evenodd" />
      </svg>

      {/* Hover Tooltip/Label */}
      <span className="absolute right-16 scale-0 origin-right transition-all duration-300 group-hover:scale-100 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap shadow-xl">
        Triagem & Atendimento WhatsApp
      </span>
    </button>
  );
}
