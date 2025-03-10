import { onInsert } from 'common/snabbdom';
import { h } from 'snabbdom';
import type LobbyController from '../../../ctrl';
import { variantsBlindMode, variants, variantsForGameType } from '../../../options';
import { option } from './option';

export const variantPicker = (ctrl: LobbyController) => {
  const { setupCtrl } = ctrl;
  const baseVariants = site.blindMode ? variantsBlindMode : variants;
  return h('div.variant.label-select', [
    h('label', { attrs: { for: 'sf_variant' } }, i18n.site.variant),
    h(
      'select#sf_variant',
      {
        on: { change: (e: Event) => setupCtrl.variant((e.target as HTMLSelectElement).value as VariantKey) },
        hook: onInsert<HTMLSelectElement>(element => element.focus()),
      },
      variantsForGameType(baseVariants, setupCtrl.gameType!).map(variant =>
        option(variant, setupCtrl.variant()),
      ),
    ),
  ]);
};
