import { html } from "./lit-element";
import BatteryViewModel from "./battery-vm";
import { isNumber } from "./utils";


const header = (text: string) => html`
<div class="card-header">
    <div class="truncate">
        ${text}
    </div>
</div>
`;

const secondaryInfo = (model: BatteryViewModel) => model.secondary_info && html`
<div class="secondary">${model.secondary_info}</div>
`;

export const battery = (model: BatteryViewModel) => html`
<div class="battery ${model.classNames}" @click=${model.action}>
    <div class="icon">
        <ha-icon
            style="color: ${model.levelColor}"
            icon="${model.icon}"
        ></ha-icon>
    </div>
    <div class="name truncate">
        ${model.name}
        ${secondaryInfo(model)}
    </div>
    <div class="state">
        ${model.level}${isNumber(model.level) ? html`&nbsp;%` : ""}
    </div>
</div>
`;

export const card = (headerText: string | undefined, contents: string[]) => html`
<ha-card>
    ${headerText ? header(headerText) : ""}
    <div class="card-content">
        ${contents}
    </div>
</ha-card>
`;

export const collapsableWrapper = (contents: string[], collapseAfter: number) => {
    const elemId = "expander" + Math.random().toString().substr(2);
    return html`
    ${contents.slice(0, collapseAfter)}
    <input type="checkbox" class="expand" id="${elemId}" />
    <label for="${elemId}"><div>&lsaquo;</div></label>
    <div>${contents.slice(collapseAfter)}</div>
    `
};

export const empty = () => html``;