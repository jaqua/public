import { PropsWithChildren, useCallback, useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Path, Svg } from 'react-native-svg'

import BasicAppBar from '@/components/headers/BasicAppBar'
import SearchBar from '@/components/inputs/SearchBar'
import ThemeConfig from '@/constants/myTheme'
import { getOrientation } from '@/utils/utils'
import { cs } from '@@/libs/utils'
import { useLinkProps } from '@react-navigation/native'
import clsx from 'clsx'

const filters = ['fitler1', 'filter2', 'filter3']
const sortOptions = ['popularity', 'newest', 'oldest']

const Categories = [
  {
    id: 'a',
    title: 'Category 1',
    subtitle: 'Accompanying text',
    uri: require('@@/assets/baby/baby-1.jpg')
  },
  {
    id: 'b',
    title: 'Category 2',
    subtitle: 'Accompanying text',

    uri: require('@@/assets/baby/baby-1.jpg')
  },
  {
    id: 'c',
    title: 'Category 3',
    subtitle: 'Accompanying text',

    uri: require('@@/assets/baby/baby-1.jpg')
  },
  {
    id: 'd',
    title: 'Category 4',
    subtitle: 'Accompanying text',

    uri: require('@@/assets/baby/baby-1.jpg')
  },
  {
    id: 'e',
    title: 'Category 4',
    subtitle: 'Accompanying text',

    uri: require('@@/assets/baby/baby-1.jpg')
  }
]

const CategoryScreen2 = () => {
  const theme = ThemeConfig()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(filters[0])
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const onFilterPress = useCallback((f: string) => {
    return () => {
      setFilter(f)
    }
  }, [])

  const onSortPress = useCallback((f: string) => {
    return () => {
      setSortBy(f)
    }
  }, [])

  const isLandscape = getOrientation() === 'landscape'

  return (
    <View className="flex-1">
      <BasicAppBar title="Categories" />

      <View
        className={clsx({
          'bg-red-500 flex-1 container': true,
          'flex-row-reverse': isLandscape
        })}
      >
        <View
          className={clsx({
            'pt-8': true,
            'flex-1 ml-[8%]': isLandscape
          })}
        >
          <SearchBar />
        </View>

        <View style={{ flex: 1 }}>
          <View className=" pt-8 pb-8">
            <Text className="text-4xl font-aeonisBold text-primary">
              Category
            </Text>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row justify-between  space-x-5">
                {filters.map((filterName) => {
                  const f = filter === filterName
                  return (
                    <Pressable
                      key={filterName}
                      onPress={onFilterPress(filterName)}
                      className={cs({
                        'rounded-full px-1 items-center w-36 h-8': true,
                        'bg-accent text-white': f
                      })}
                    >
                      <Text
                        className={clsx([
                          f ? 'text-white' : 'text-basicGrey',
                          'text-lg font-montserrat font-bold'
                        ])}
                      >
                        {filterName}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </ScrollView>
          </View>

          {/* Sort by */}
          <View className=" pt-6 pb-6">
            <Text className="text-primary text-4xl font-aeonisBold text-[23px]">
              Sort by
            </Text>
          </View>
          <View className="flex-row pb-6 space-x-5">
            {sortOptions.map((sortName) => {
              return (
                <Pressable
                  key={sortName}
                  onPress={onSortPress(sortName)}
                  className={cs({
                    'bg-white border-2 border-primary  rounded-lg py-2 px-4 items-center min-w- max-w-[144px]':
                      true,
                    'bg-accent border-0': sortBy === sortName
                  })}
                >
                  <Text
                    className={cs(
                      sortBy === sortName ? 'text-white' : 'text-primary',
                      'capitalize font-montserrat font-bold text-lg'
                    )}
                  >
                    {sortName}
                  </Text>
                </Pressable>
              )
            })}
          </View>
          {/* End Sort by */}
        </View>
      </View>

      {/* <FlatList
        className="px-7 pt-12"
        data={Categories}
        renderItem={({ item }) => <CategoryItem {...item} />}
        keyExtractor={(item) => item.id}
      /> */}

      {/* <ScrollView className="px-7 pt-12">
        {Categories.map((item) => {
          return (
            <CategoryItem
              key={item.id}
              {...item}
            />
          );
        })}
      </ScrollView> */}

      <View className="flex-1 w-full container bg-red-500">
        <FlatList
          numColumns={isLandscape ? 2 : 1}
          columnWrapperStyle={isLandscape ? { gap: 60 } : false}
          contentContainerStyle={{ gap: 30 }}
          data={Categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <CategoryItem {...item} />
          }}
        />
      </View>
    </View>
  )
}

const CategoryScreen = () => {
  const theme = ThemeConfig()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(filters[0])
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const onFilterPress = useCallback((f: string) => {
    return () => {
      setFilter(f)
    }
  }, [])

  const onSortPress = useCallback((f: string) => {
    return () => {
      setSortBy(f)
    }
  }, [])

  const isLandscape = getOrientation() === 'landscape'

  return (
    <View className="flex-1 bg-red-500">
      <BasicAppBar title="Categories" />

      <View
        className={cs({
          'bg-red-500 flex-1 container': true,
          'flex-row-reverse': isLandscape
        })}
      >
        <View
          className={cs({
            'pt-8': true,
            'flex-1 ml-[8%]': isLandscape
          })}
        >
          <SearchBar />
        </View>

        <View style={{ flex: 1 }}>
          <View className=" pt-8 pb-8">
            <Text className="text-4xl font-aeonisBold text-primary">
              Category
            </Text>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row justify-between  space-x-5">
                {filters.map((filterName) => {
                  const f = filter === filterName
                  return (
                    <Pressable
                      key={filterName}
                      onPress={onFilterPress(filterName)}
                      className={cs({
                        'rounded-full px-1 items-center w-36 h-8': true,
                        'bg-accent text-white': f
                      })}
                    >
                      <Text
                        className={cs([
                          f ? 'text-white' : 'text-basicGrey',
                          'text-lg font-montserrat font-bold'
                        ])}
                      >
                        {filterName}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </ScrollView>
          </View>

          {/* Sort by */}
          <View className=" pt-6 pb-6">
            <Text className="text-primary text-4xl font-aeonisBold text-[23px]">
              Sort by
            </Text>
          </View>
          <View className="flex-row pb-6 space-x-5">
            {sortOptions.map((sortName) => {
              return (
                <Pressable
                  key={sortName}
                  onPress={onSortPress(sortName)}
                  className={cs({
                    'bg-white border-2 border-primary  rounded-lg py-2 px-4 items-center min-w- max-w-[144px]':
                      true,
                    'bg-accent border-0': sortBy === sortName
                  })}
                >
                  <Text
                    className={cs(
                      sortBy === sortName ? 'text-white' : 'text-primary',
                      'capitalize font-montserrat font-bold text-lg'
                    )}
                  >
                    {sortName}
                  </Text>
                </Pressable>
              )
            })}
          </View>
          {/* End Sort by */}
        </View>
      </View>

      <View className="flex-1 w-full container bg-red-500">
        <FlatList
          numColumns={isLandscape ? 2 : 1}
          columnWrapperStyle={isLandscape ? { gap: 60 } : false}
          contentContainerStyle={{ gap: 30 }}
          data={Categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <CategoryItem {...item} />
          }}
        />
      </View>
    </View>
  )
}

type ItemProps = {
  title: string
  subtitle: string
  uri: any
  id: string
}
const CategoryItem = ({ title, uri, id, subtitle }: ItemProps) => {
  const { onPress } = useLinkProps({
    to: {
      screen: 'CategoryItem',
      params: {
        cid: id
      }
    }
  })
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row">
        <View
          style={{
            width: '20%'
          }}
          className="flex-row"
        >
          <Image source={uri} className="w-full aspect-square rounded-md" />
        </View>
        <View className="pl-6 justify-center mr-auto">
          <Text
            adjustsFontSizeToFit
            className="text-2xl  font-aeonisBold text-primary"
          >
            {title}
          </Text>
          <Text className="text-sm font-montserrat text-basicGrey">
            {subtitle}
          </Text>
        </View>

        <View className=" flex-row items-center space-x-2">
          <View className="relative items-center justify-center">
            <OctaveSvg />
            <Text className="text-white absolute">5</Text>
          </View>
          <Text className="text-basicGrey text-lg font-medium">videos</Text>
        </View>
      </View>
    </Pressable>
  )
}

const OctaveSvg = ({ children }: PropsWithChildren) => {
  return (
    <Svg width={30} height={30} viewBox="0 0 28.53 27.86">
      <Path
        fill={'#bbbdbf'}
        d="M22.61 25.14a4 4 0 0 0-1.77.13q-1.515.465-2.37 1.8c-.53.84-1.36 1.02-2.19.47a4.1 4.1 0 0 0-1.74-.67c-.59-.08-1.14.1-1.67.33-.21.09-.41.19-.59.33-.78.6-1.78.29-2.25-.49-.81-1.31-2.04-1.93-3.58-1.95-.17 0-.33.03-.5.04-.86.05-1.51-.54-1.57-1.4-.13-1.74-1.01-2.98-2.61-3.67-.87-.38-1.18-1.18-.81-2.05.69-1.59.5-3.09-.58-4.45-.58-.73-.48-1.6.25-2.17 1.38-1.09 1.92-2.51 1.6-4.24-.16-.89.36-1.61 1.24-1.76 1.7-.29 2.87-1.25 3.39-2.9.28-.89 1.17-1.32 2.03-1.03 1.61.55 3.06.2 4.3-.97.7-.66 1.45-.66 2.16 0 1.25 1.18 2.71 1.5 4.34.96.9-.3 1.67.09 1.96.99.55 1.67 1.7 2.65 3.44 2.95.85.14 1.38.88 1.22 1.73-.33 1.77.23 3.2 1.65 4.3.66.51.77 1.42.24 2.07-1.12 1.4-1.33 2.92-.6 4.57.35.79.02 1.63-.79 1.97-1.64.7-2.53 1.95-2.66 3.73-.06.8-.68 1.38-1.54 1.36Z"
      />
    </Svg>
  )
}

const styles = StyleSheet.create({})

export default CategoryScreen
