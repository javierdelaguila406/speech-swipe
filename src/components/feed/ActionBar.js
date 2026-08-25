import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionButton } from './ActionButton';
import { COLORS } from '@/config/theme';
export const ActionBar = ({ onListenClick, onSlowClick, onLipsClick, onPracticeClick, isPlaying, isRecording, hasAudio, hasSlowAudio, hasVideo }) => {
    return (_jsxs("div", { className: "flex items-center justify-center gap-8 px-4 py-6", children: [_jsx(ActionButton, { icon: "\uD83D\uDD0A", label: "Escuchar", color: COLORS.action.listen, isActive: isPlaying, disabled: !hasAudio, onClick: onListenClick, ariaLabel: "Escuchar frase a velocidad normal" }), _jsx(ActionButton, { icon: "\uD83D\uDC22", label: "Lento", color: COLORS.action.slow, disabled: !hasSlowAudio, onClick: onSlowClick, ariaLabel: "Escuchar frase lentamente" }), _jsx(ActionButton, { icon: "\uD83D\uDC44", label: "Labios", color: COLORS.action.lips, disabled: !hasVideo, onClick: onLipsClick, ariaLabel: "Ver labios pronunciando la frase" }), _jsx(ActionButton, { icon: "\uD83C\uDFA4", label: "Practicar", color: COLORS.action.practice, isActive: isRecording, onClick: onPracticeClick, ariaLabel: "Grabar tu intento de pronunciaci\u00F3n" })] }));
};
