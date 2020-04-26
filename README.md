# Battery State Card
Battery state card for [Home Assistant](https://github.com/home-assistant/home-assistant). It shows battery levels from connected devices (entities).

## Overview

This card was inspired by [another great card](https://github.com/cbulock/lovelace-battery-entity) showing the battery states. I have decided to implement my own as there was no response for pull requests from author and I wanted to fix few things and also add couple new features.

Card code is very small - less than 10KB. It **doesn't** depend on external dependencies (eg. downloaded every time from CDN).

![image](https://user-images.githubusercontent.com/8268674/79861655-a4393100-83cc-11ea-8be1-328cdf35807b.png)

## Config

### Card config
| Name | Type | Default | Since | Description |
|:-----|:-----|:-----|:-----|:-----|
| entities | array(string \| [Entity](#entity-object)) | **(required)** | v0.9.0 | List of entities
| name | string | `"Battery levels"` | v0.9.0 | Card title
| sort_by_level | string |  | v0.9.0 | Values: `asc`, `desc`
| collapse | number |  | v1.0.0 | Number of entities to show. Rest will be available in expandable section ([example](#sorted-list-and-collapsed-view))

+[appearance options](#appearance-options)


### Entity object
| Name | Type | Default | Since | Description |
|:-----|:-----|:-----|:-----|:-----|
| entity | string | **(required)** | v0.9.0 | Entity ID
| name | string | | v0.9.0 | Entity name override
| attribute | string | | v0.9.0 | Name of attribute (override) to extract the value from. By default we look for values in the following attributes: `battery_level`, `battery`. If they are not present we take entity state.
| multiplier | number | `1` | v0.9.0 | If the value is not in 0-100 range we can adjust it by specifying multiplier. E.g. if the values are in 0-10 range you can make them working by putting `10` as multiplier.

 +[appearance options](#appearance-options)

### Appearance options

| Name | Type | Default | Since | Description |
|:-----|:-----|:-----|:-----|:-----|
| color_thresholds | array([Threshold](#threshold-object)) | (see [below](#default-thresholds)) | v0.9.0 | Thresholds and colors for indication of battery level.
| color_gradient | array(string) | | v0.9.0 | Array of hex HTML colors. At least two. In #XXXXXX format, eg. `"#FFB033"`.

### Threshold object

| Name | Type | Default | Since | Description |
|:-----|:-----|:-----|:-----|:-----|
| value | number | **(required)** | v0.9.0 | Threshold value
| color | string | `inherit` | v0.9.0 | CSS color which will be used for levels below or equal the value field. If not specified the default one is used (default icon/text color for current HA theme)

#### Default thresholds
| Value | Color | Description |
|:------|:------|:------|
| 20 | `var(--label-badge-red)` | If value is less or equal `20` the color will be red
| 55 | `var(--label-badge-yellow)` | If value is less or equal `55` the color will be yellow
| 100 | `var(--label-badge-green)` | If value is less or equal `100` the color will be green

Note: the exact color is taken from CSS variable and it depends on your current template.

## Examples

You can use this component as a card or as an entity (e.g. in `entities card`);

### Card view
Card view is useful when you want to have cleaner config (you don't need to duplicate settings in every entity entry) and when you want to apply same settings (e.g. colors) for all the battery entities.

![image](https://user-images.githubusercontent.com/8268674/79760617-3c291300-8318-11ea-8b97-006e3d537568.png)

```yaml
- type: custom:battery-state-card
  entities:
    - sensor.bathroom_motion_battery_level
    - sensor.bedroom_balcony_battery_level
    - entity: sensor.bedroom_motion_battery_level
      name: "Bedroom motion sensor"
```

### Entity view
Entity view is useful when you want to add battery status next to other sensors (in the same card).

![image](https://user-images.githubusercontent.com/8268674/79758073-cff8e000-8314-11ea-94e0-2059460ec4ea.png)

```yaml
- type: entities
    title: Other
    show_header_toggle: false
    entities:
    - sensor.energy_rpi_monthly
    - sensor.home_assistant_v2_db
    - sensor.hassio_online
    - sensor.last_boot
    - type: custom:battery-state-card
      entity: sensor.temp_outside_battery_numeric
```

### Custom colors

#### Custom threshold colors

![image](https://user-images.githubusercontent.com/8268674/79862088-6e487c80-83cd-11ea-8a84-4eecc3601ae2.png)

```yaml
- type: custom:battery-state-card
  thresholds:
    - value: 35 # applied to all values below/equal
      color: "#8fffe1"
    - value: 45 # applied to all values below/equal
      color: "#8fbbff"
    - value: 60 # applied to all values below/equal
      color: "#978fff"
    - value: 100 # applied to all values below/equal
      color: "#fe8fff"
  entities:
    - entity: sensor.bathroom_motion_battery_level
      name: "Bathroom motion sensor"
    - entity: sensor.bedroom_balcony_battery_level
      name: "Bedroom balkony door sensor"
    - entity: sensor.bedroom_motion_battery_level
      name: "Bedroom motion sensor"
    - entity: sensor.bedroom_switch_battery_level
      name: "Bedroom Aqara switch"
    - entity: sensor.bedroomtemp_battery_level
      name: "Bedroom temp. sensor"
```

#### Gradient colors

![image](https://user-images.githubusercontent.com/8268674/79856685-8ec00900-83c4-11ea-82bf-b3df6385850f.png)

```yaml
- type: custom:battery-state-card
  color_gradient:
    - "#ff0000" # red
    - "#ffff00" # yellow
    - "#00ff00" # green
  entities:
    - entity: sensor.bathroom_motion_battery_level
      name: "Bathroom motion sensor"
    - entity: sensor.bedroom_balcony_battery_level
      name: "Bedroom balkony door sensor"
    - entity: sensor.bedroom_motion_battery_level
      name: "Bedroom motion sensor"
    - entity: sensor.bedroom_switch_battery_level
      name: "Bedroom Aqara switch"
    - entity: sensor.bedroomtemp_battery_level
      name: "Bedroom temp. sensor"
```

#### Disabling colors

When you put empty array in `color_thresholds` property you can disable colors.

![image](https://user-images.githubusercontent.com/8268674/79975932-aa461500-8493-11ea-9947-f4513863ae53.png)

```yaml
- type: custom:battery-state-card
  color_thresholds: []
  entities:
    - sensor.bedroom_motion_battery_level
    - sensor.bathroom_motion_battery_level
    - sensor.bedroomtemp_battery_level
    - sensor.bedroom_balcony_battery_level
    - sensor.bedroom_switch_battery_level
```

You can setup as well colors only for lower battery levels and leave the default one for the rest.

![image](https://user-images.githubusercontent.com/8268674/79977247-d793c280-8495-11ea-82f1-78f48ad4fc5b.png)

```yaml
- type: custom:battery-state-card
  color_thresholds:
    - value: 20
      color: "red"
    - value: 60
      color: "yellow"
  entities:
    - sensor.bedroom_motion_battery_level
    - sensor.bathroom_motion_battery_level
    - sensor.bedroomtemp_battery_level
    - sensor.bedroom_balcony_battery_level
    - sensor.bedroom_switch_battery_level
```

### Sorted list and collapsed view

![ezgif com-resize](https://user-images.githubusercontent.com/8268674/80119122-31bd8200-8581-11ea-9221-aee943d0b1a0.gif)

```yaml
- type: custom:battery-state-card
  name: "Sorted list and collapsed view"
  sort_by_level: "asc"
  collapse: 4
  entities:
    - sensor.bedroom_motion_battery_level
    - sensor.bathroom_motion_battery_level
    - sensor.bedroomtemp_battery_level
    - sensor.bedroom_balcony_battery_level
    - sensor.bedroom_switch_battery_level
```

## Installation

Once added to [HACS](https://community.home-assistant.io/t/custom-component-hacs/121727) add the following to your lovelace configuration
```yaml
resources:
  - url: /hacsfiles/battery-state-card/battery-state-card.js
    type: module
```

If you don't have HACS you can download js file from [latest release](https://github.com/maxwroc/battery-state-card/releases/latest). Drop it then in `www` folder in your `config` directory. Next add the following entry in lovelace configuration
```yaml
resources:
  - url: /local/battery-state-card.js
    type: module
```

## Development
```shell
npm install
npm run build
```
Bundeled transpiled code will appear in `dist` directory.

Note: there is "undocumented" `value_override` property on the [entity object](#entity-object) which you can use for testing.

## Do you like the card?

If you do like the card please star it on [github](https://github.com/maxwroc/battery-state-card)! This is a great way to give feedback and motivation boost for me to continue working on it. Thanks!

## License

This project is under the [MIT license](https://github.com/maxwroc/battery-state-card/blob/master/LICENSE).