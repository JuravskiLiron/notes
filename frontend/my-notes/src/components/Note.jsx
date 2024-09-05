import {
    useToast,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import moment from "moment";

export default function Note({id, title, description, createdAt, onEdit, onDelete}) {
    const toast = useToast()
    return (
        <Card variant={"filled"}>
            <CardHeader>
                <Heading size={"md"}>{title}</Heading>
            </CardHeader>
            <Divider borderColor={"gray"}/>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
            <Divider borderColor={"gray"}/>
            <CardFooter>
                {moment(createdAt).format("DD/MM/YYYY h:mm:ss")}
                <Button
                    ml="auto"
                    display="block"
                    colorScheme='blue'
                    onClick={() => {
                        console.log("Edit clicked for ID:", id);
                        onEdit(id);
                    }}
                >
                    Edit
                </Button>
                <Button
                    ml="auto"
                    display="block"
                    colorScheme='red'
                  
                    
                  
                    onClick={() => {
                        toast({
                            title: 'Account created.',
                            description: "We've created your account for you.",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                          })
                        onDelete(id);
                        
                    }}
                >
                    Delete
                </Button>

            </CardFooter>
        </Card>
    );
}
