<script setup>
import { ref, computed, onBeforeMount, onMounted, nextTick } from 'vue'
import { faker } from "@faker-js/faker";
import { useRouter, useRoute } from 'vue-router'

defineProps({
  msg: { default: () => "" },
})


const mapUpdate = ref(false)
const router = useRouter()
const center = ref({ lat: 59.944351, lng: 30.306340 })
const model = ref(null)
const testRef = ref()
const stringOptions = [
  { label: "Михайловский сквер", coord: { lat: 59.937196, lng: 30.331569 }, zoom: 18 },
  { label: "Новая Голландия", coord: { lat: 59.92909404014325, lng: 30.289958280095856 }, zoom: 17 },
  { label: "Севкабель Порт", coord: { lat: 59.924628118864064, lng: 30.242001215687342 }, zoom: 18 },
  { label: "Галерея", coord: { lat: 59.927641412589566, lng: 30.36105972457745 }, zoom: 17 },
  { label: "Смольный", coord: { lat: 59.94631276587953, lng: 30.396586691186226 }, zoom: 17 },
  { label: "Марсово Поле", coord: { lat: 59.94414789756761, lng: 30.331800940421434 }, zoom: 17 },
  { label: "Приморский парк победы", coord: { lat: 59.97000413060951, lng: 30.24930055176255 }, zoom: 17 },
  { label: "Зенит Арена", coord: { lat: 59.93645752678102, lng: 30.320672342271337 }, zoom: 17 },
  { label: "Невский проспект", coord: { lat: 59.9312530328718, lng: 30.360822647821983 }, zoom: 17 },
  { label: "Стокман", coord: { lat: 59.93152528331715, lng: 30.36006097850815 }, zoom: 17 },
  { label: "Владимирская", coord: { lat: 59.92622419220395, lng: 30.347740507159216 }, zoom: 17 },
  { label: "Петрога", coord: { lat: 59.96635880991292, lng: 30.311505609972592 }, zoom: 17 },
  { label: "Андреевский бульвар", coord: { lat: 59.94084478764555, lng: 30.281416439628906 }, zoom: 17 },
  { label: "Казанский", coord: { lat: 59.9337692044082, lng: 30.323971668716105 }, zoom: 17 },
  { label: "Иисакий", coord: { lat: 59.9339694764429, lng: 30.30664593062881 }, zoom: 17 },
  { label: "Спас на крови", coord: { lat: 59.940134926841175, lng: 30.329072649613646 }, zoom: 17 },
  { label: "Дворцовая площадь", coord: { lat: 59.93901184095521, lng: 30.315545397552093 }, zoom: 17 },
  { label: "Витебский вокзал", coord: { lat: 59.92017523586487, lng: 30.32986793876919 }, zoom: 17 },
  { label: "Пять углов", coord: { lat: 59.92659072510887, lng: 30.34306133617933 }, zoom: 17 },
  { label: "Чкаловская", coord: { lat: 59.960975800695785, lng: 30.29241699861684 }, zoom: 17 },
  { label: "Финляндский Вокзал", coord: { lat: 59.955755348891344, lng: 30.357269689611247 }, zoom: 17 },
  { label: "Сенная площадь", coord: { lat: 59.927056894900616, lng: 30.318972209193873 }, zoom: 17 },
  { label: "Стрелка Васьки", coord: { lat: 59.94431209094275, lng: 30.307478038030595 }, zoom: 17 },
  { label: "Обводный канал", coord: { lat: 59.91579552448001, lng: 30.344494943106138 }, zoom: 17 },
  { label: "Аничков мост и сад", coord: { lat: 59.93331225296033, lng: 30.343898082208757 }, zoom: 17 },
  { label: "Екатеринский сквер", coord: { lat: 59.933299778717014, lng: 30.337364780358467 }, zoom: 17 },
  { label: "Юсуповский дворец", coord: { lat: 59.928076264230064, lng: 30.301424490355064 }, zoom: 17 },
  { label: "Николо-Богоявленский Морской собор", coord: { lat: 59.922634399157346, lng: 30.300536439879664 }, zoom: 17 },
  { label: "Мариинский Дворец", coord: { lat: 59.93117686983479, lng: 30.309772388300157 }, zoom: 17 },
  { label: "Адмиралтейский сад", coord: { lat: 59.935987270993614, lng: 30.305864053373092 }, zoom: 17 },
  { label: "Дворцовая наб", coord: { lat: 59.94065927471435, lng: 30.311396069855103 }, zoom: 17 },
  { label: "Таврический сад", coord: { lat: 59.94581179271423, lng: 30.373137409194864 }, zoom: 17 },
  { label: "Никольские ряды", coord: { lat: 59.92106735103681, lng: 30.301754822686338 }, zoom: 17 },
  { label: "А2 Петрога", coord: { lat: 59.96912968499716, lng: 30.315560512762083 }, zoom: 17 },
  { label: "Ботанический сад", coord: { lat: 59.96985679986012, lng: 30.326280311046588 }, zoom: 17 },
  { label: "Невская ратуша", coord: { lat: 59.93896548970254, lng: 30.38547535152302 }, zoom: 17 },
  { label: "Эрарта", coord: { lat: 59.932235283152515, lng: 30.251482063165074 }, zoom: 17 },
  { label: "Бертгольд центр", coord: { lat: 59.9282567678527, lng: 30.313207399401925 }, zoom: 17 },
  { label: "Александра Невского Лавра", coord: { lat: 59.921005510586774, lng: 30.38856953008747 }, zoom: 17 },
  { label: "Seno творческое пространство", coord: { lat: 59.92660065408107, lng: 30.32290987850785 }, zoom: 17 },
  { label: "Летний сад", coord: { lat: 59.94496587682061, lng: 30.338397925812078 }, zoom: 17 },
  { label: "Петропавловская Крепость", coord: { lat: 59.950077090169984, lng: 30.31745500310363 }, zoom: 17 },
  { label: "Беговая", coord: { lat: 59.988175235469534, lng: 30.203482793854143 }, zoom: 17 },
  { label: "Лахта центр", coord: { lat: 59.987032675835, lng: 30.17906820106179 }, zoom: 17 },
  { label: "Сфинксы", coord: { lat: 59.93695286924648, lng: 30.290817449672595 }, zoom: 17 },
  { label: "Крейсер Аврора", coord: { lat: 59.95576437339806, lng: 30.33791872877971 }, zoom: 17 },
  { label: "Цпкио", coord: { lat: 59.97949645571678, lng: 30.261387540914992 }, zoom: 17 },
  { label: "Банковский мост", coord: { lat: 59.932213306113134, lng: 30.3253473380299 }, zoom: 17 },
  { label: "Красный мост", coord: { lat: 59.9331074803261, lng: 30.315607693851145 }, zoom: 17 },
  { label: "Парк победа", coord: { lat: 59.86641722578417, lng: 30.32234688687086 }, zoom: 17 },
  { label: "Московская", coord: { lat: 59.85248232989574, lng: 30.322593407387256 }, zoom: 17 },
  { label: "Атлантик сити", coord: { lat: 59.98673100650457, lng: 30.2039913785111 }, zoom: 17 },
  { label: "Фабрика", coord: { lat: 59.93293990556306, lng: 30.43128867850821 }, zoom: 17 },
  { label: "Брусницын квартал", coord: { lat: 59.92210637656133, lng: 30.249544038029317 }, zoom: 17 },
  { label: "Английская набережная", coord: { lat: 59.933856877272724, lng: 30.293410318445815 }, zoom: 17 },
  { label: "Площадь Восстания", coord: { lat: 59.930949106693205, lng: 30.361695184059045 }, zoom: 17 },
  { label: "Михайловский замок", coord: { lat: 59.940047416332106, lng: 30.338486180358814 }, zoom: 17 },
  { label: "Александровский сад", coord: { lat: 59.935981896197866, lng: 30.30574603617975 }, zoom: 17 },
]
const options = ref(stringOptions)

const markers = ref([
  { id: "Михайловский сквер", position: { lat: 59.937196, lng: 30.331569 }, },
  { id: "Новая Голландия", position: { lat: 59.92909404014325, lng: 30.289958280095856 }, },
  { id: "Севкабель Порт", position: { lat: 59.924628118864064, lng: 30.242001215687342 }, },
  { id: "Галерея", position: { lat: 59.927641412589566, lng: 30.36105972457745 }, },
  { id: "Смольный", position: { lat: 59.94631276587953, lng: 30.396586691186226 }, },
  { id: "Марсово Поле", position: { lat: 59.94414789756761, lng: 30.331800940421434 }, },
  { id: "Приморский парк победы", position: { lat: 59.97000413060951, lng: 30.24930055176255 }, },
  { id: "Зенит Арена", position: { lat: 59.93645752678102, lng: 30.320672342271337 }, },
  { id: "Невский проспект", position: { lat: 59.9312530328718, lng: 30.360822647821983 }, },
  { id: "Стокман", position: { lat: 59.93152528331715, lng: 30.36006097850815 }, },
  { id: "Владимирская", position: { lat: 59.92622419220395, lng: 30.347740507159216 }, },
  { id: "Петрога", position: { lat: 59.96635880991292, lng: 30.311505609972592 }, },
  { id: "Андреевский бульвар", position: { lat: 59.94084478764555, lng: 30.281416439628906 }, },
  { id: "Казанский", position: { lat: 59.9337692044082, lng: 30.323971668716105 }, },
  { id: "Иисакий", position: { lat: 59.9339694764429, lng: 30.30664593062881 }, },
  { id: "Спас на крови", position: { lat: 59.940134926841175, lng: 30.329072649613646 }, },
  { id: "Дворцовая площадь", position: { lat: 59.93901184095521, lng: 30.315545397552093 }, },
  { id: "Витебский вокзал", position: { lat: 59.92017523586487, lng: 30.32986793876919 }, },
  { id: "Пять углов", position: { lat: 59.92659072510887, lng: 30.34306133617933 }, },
  { id: "Чкаловская", position: { lat: 59.960975800695785, lng: 30.29241699861684 }, },
  { id: "Финляндский Вокзал", position: { lat: 59.955755348891344, lng: 30.357269689611247 }, },
  { id: "Сенная площадь", position: { lat: 59.927056894900616, lng: 30.318972209193873 }, },
  { id: "Стрелка Васьки", position: { lat: 59.94431209094275, lng: 30.307478038030595 }, },
  { id: "Обводный канал", position: { lat: 59.91579552448001, lng: 30.344494943106138 }, },
  { id: "Аничков мост и сад", position: { lat: 59.93331225296033, lng: 30.343898082208757 }, },
  { id: "Екатеринский сквер", position: { lat: 59.933299778717014, lng: 30.337364780358467 }, },
  { id: "Юсуповский дворец", position: { lat: 59.928076264230064, lng: 30.301424490355064 }, },
  { id: "Николо-Богоявленский Морской собор", position: { lat: 59.922634399157346, lng: 30.300536439879664 }, },
  { id: "Мариинский Дворец", position: { lat: 59.93117686983479, lng: 30.309772388300157 }, },
  { id: "Адмиралтейский сад", position: { lat: 59.935987270993614, lng: 30.305864053373092 }, },
  { id: "Дворцовая наб", position: { lat: 59.94065927471435, lng: 30.311396069855103 }, },
  { id: "Таврический сад", position: { lat: 59.94581179271423, lng: 30.373137409194864 }, },
  { id: "Никольские ряды", position: { lat: 59.92106735103681, lng: 30.301754822686338 }, },
  { id: "А2 Петрога", position: { lat: 59.96912968499716, lng: 30.315560512762083 }, },
  { id: "Ботанический сад", position: { lat: 59.96985679986012, lng: 30.326280311046588 }, },
  { id: "Невская ратуша", position: { lat: 59.93896548970254, lng: 30.38547535152302 }, },
  { id: "Эрарта", position: { lat: 59.932235283152515, lng: 30.251482063165074 }, },
  { id: "Бертгольд центр", position: { lat: 59.9282567678527, lng: 30.313207399401925 }, },
  { id: "Александра Невского Лавра", position: { lat: 59.921005510586774, lng: 30.38856953008747 }, },
  { id: "Seno творческое пространство", position: { lat: 59.92660065408107, lng: 30.32290987850785 }, },
  { id: "Летний сад", position: { lat: 59.94496587682061, lng: 30.338397925812078 }, },
  { id: "Петропавловская Крепость", position: { lat: 59.950077090169984, lng: 30.31745500310363 }, },
  { id: "Беговая", position: { lat: 59.988175235469534, lng: 30.203482793854143 }, },
  { id: "Лахта центр", position: { lat: 59.987032675835, lng: 30.17906820106179 }, },
  { id: "Сфинксы", position: { lat: 59.93695286924648, lng: 30.290817449672595 }, },
  { id: "Крейсер Аврора", position: { lat: 59.95576437339806, lng: 30.33791872877971 }, },
  { id: "Цпкио", position: { lat: 59.97949645571678, lng: 30.261387540914992 }, },
  { id: "Банковский мост", position: { lat: 59.932213306113134, lng: 30.3253473380299 }, },
  { id: "Красный мост", position: { lat: 59.9331074803261, lng: 30.315607693851145 }, },
  { id: "Парк победа", position: { lat: 59.86641722578417, lng: 30.32234688687086 }, },
  { id: "Московская", position: { lat: 59.85248232989574, lng: 30.322593407387256 }, },
  { id: "Атлантик сити", position: { lat: 59.98673100650457, lng: 30.2039913785111 }, },
  { id: "Фабрика", position: { lat: 59.93293990556306, lng: 30.43128867850821 }, },
  { id: "Брусницын квартал", position: { lat: 59.92210637656133, lng: 30.249544038029317 }, },
  { id: "Английская набережная", position: { lat: 59.933856877272724, lng: 30.293410318445815 }, },
  { id: "Площадь Восстания", position: { lat: 59.930949106693205, lng: 30.361695184059045 }, },
  { id: "Михайловский замок", position: { lat: 59.940047416332106, lng: 30.338486180358814 }, },
  { id: "Александровский сад", position: { lat: 59.935981896197866, lng: 30.30574603617975 }, },
])

// const onMapClick = (input) => {
// console.log("🚀 ~ id:", id)
// console.log(`Clicked on lng:${input.latLng?.lng()} lat:${input.latLng?.lat()} `)
// mapUpdate.value = true
// markers.value.push({
//   id: new Date().getTime(),
//   position: {
//     lat: input.latLng?.lat(),
//     lng: input.latLng?.lng()
//   }
// })
// nextTick(() => {
//   mapUpdate.value = false
// })
// center.value = input
// }

// @click="(g) => onMapClick(g)"

const filterFn = (val, update, abort) =>
  update(() => {
    const needle = val.toLowerCase()

    options.value = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
  })

const redirectFn = (val) => {
  mapUpdate.value = true

  if (val.label === `google`) {
    window.location.href = "https://google.com/contact"
  } else {
    router.push(`/${val.label}`)
  }

  center.value = val.coord
  currentZoom.value = val.zoom

  nextTick(() => {
    mapUpdate.value = false
  })
}

const currentZoom = ref(11)

</script>


<template>
  <div class="d-flex w-100 align-center justify-center flex-column">
    <div class="title-wrapper text-size">

      <p>White.Balance</p>
      <p>интерактивные карты🗺️</p>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-md row">
        <q-select filled v-model="model" class="select-wrapper" use-input hide-selected fill-input hide-hint autofocus
          hint="Выберите нужную локацию!" :options="options" @filter="filterFn" label="Локация" option-label="label"
          option-value="label" @update:modelValue="(val) => redirectFn(val)">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <GMapMap v-if="!mapUpdate" ref="testRef" :center="center" :zoom="currentZoom" map-type-id="terrain"
      class="default-map" :clickableIcons="true">

      <template>

        <GMapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" :draggable="false"
          :clickable="true" @click="center = marker.position" />


      </template>
    </GMapMap>

  </div>

</template>

<style scoped lang="scss">
.default-map {
  width: 1000px;
  height: 600px;

  @media screen and (min-width:360px) and (max-width:540px)  {
    width: 325px;
    height: 390px;
  }

  border: 2px solid #04333d;
  box-shadow: 1px 1px 3px #04333d;
}

.title-wrapper {
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.select-wrapper {
  width: 100%;
  padding-bottom: 32px
}

// .marker-color {
//   color: rgba(255, 255, 255, 0.87);

// }</style>
