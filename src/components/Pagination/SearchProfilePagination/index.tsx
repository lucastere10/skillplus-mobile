import {
  Select, SelectTrigger, SelectInput, SelectIcon, Icon, SelectPortal,
  SelectBackdrop, SelectContent, SelectDragIndicatorWrapper,
  SelectDragIndicator, SelectItem, Text, View, Button
} from "@gluestack-ui/themed"
import { ChevronFirst, ChevronLast, ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native"

interface DataTablePaginationProps {
  pageSizeOptions?: number[]
  page: number
  size: number
  totalPages: number
  setPage: (page: number) => void
  setSize: (size: number) => void
  setTotalPages: (page: number) => void
}

export function SearchProfilePagination({
  page,
  size,
  totalPages,
  setPage,
  setSize,
  setTotalPages
}: Readonly<DataTablePaginationProps>) {

  return (
    <View flexDirection="row" alignItems="center" justifyContent="center">
      {/* <View>
        <Select
          selectedValue={`${size}`}
          onValueChange={(itemValue: string) => {
            console.log(size)
            setSize(Number(itemValue));
          }}                    >
          <SelectTrigger size="lg">
            <SelectInput placeholder={`${size}`} />
            <SelectIcon>
              <Icon />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem value={"5"} label="5" />
              <SelectItem value={"10"} label="10" />
              <SelectItem value={"15"} label="15" />
              <SelectItem value={"20"} label="20" />
              <SelectItem value={"25"} label="25" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </View> */}
      <View flexDirection="row" alignItems="center" gap={6}>
        <Text mr={8}>{page + 1} de {totalPages}</Text>
        <Button
          variant="outline"
          disabled={page === 0}
          onPress={
            () => { setPage(0) }
          }
        >
          <Icon as={ChevronFirst}></Icon>
        </Button>
        <Button
          variant="outline"
          disabled={page === 0}
          onPress={
            () => { setPage(page - 1) }
          }
        >
          <Icon as={ChevronLeftIcon}></Icon>
        </Button>
        <Button
          variant="outline"
          disabled={page === totalPages - 1}
          onPress={
            () => { setPage(page + 1) }
          }
        >
          <Icon as={ChevronRightIcon}></Icon>
        </Button>
        <Button
          variant="outline"
          disabled={page === totalPages - 1}
          onPress={
            () => { setPage(totalPages - 1) }
          }

        >
          <Icon as={ChevronLast}></Icon>
        </Button>
      </View>
    </View>
  )
}
