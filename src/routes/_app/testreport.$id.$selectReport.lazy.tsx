import { createLazyFileRoute } from '@tanstack/react-router'
import BasicDocument from '@/libs/Report/Helloworld'
import MyDocument from '@/libs/Report/Helloworld'

export const Route = createLazyFileRoute('/_app/testreport/$id/$selectReport')({
    component:  BasicDocument,
})