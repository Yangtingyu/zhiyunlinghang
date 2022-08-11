import AMapLoader from '@amap/amap-jsapi-loader'
export default async function lodMap () {
  return AMapLoader.load({
    key: '56fb7c1132b1e493bbdeaef42433f2a3',
    version: '1.4.15',
    plugins: []
  })
}
