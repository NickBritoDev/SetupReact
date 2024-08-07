import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export default function SkeletonComponent() {
  return (
    <Flex w={"100%"} flexDir={"column"}>
      <Flex w={"100%"} gap={4}>
        <Box w={"100%"} padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          <SkeletonCircle size="10" mt={4} />
        </Box>
        <Box w={"100%"} padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          <SkeletonCircle size="10" mt={4} />
        </Box>
        <Box w={"100%"} padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          <SkeletonCircle size="10" mt={4} />
        </Box>
      </Flex>

      <Stack mt={20}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Flex>
  );
}
