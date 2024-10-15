import React, { useRef, useState } from 'react'
import { useDisclosure, Box, Button, Flex, Grid, GridItem, Heading, Image, Text, Textarea, Input, FormErrorMessage, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import { BiLeftArrow } from 'react-icons/bi'
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const StokTanitimKartiDetail = () => {
    const stokKoduRef = useRef(null);
    const stokAdiRef = useRef(null);
    const yerKoduRef = useRef(null);
    const tedarikciRef = useRef(null);
    const stokKisaIsimRef = useRef(null);
    const stokYabanciIsimRef = useRef(null);
    const stokCinsiRef = useRef(null);
    const stokBirimAdiRef = useRef(null);
    const toptanVergiRef = useRef(null);
    const perakendeVergiRef = useRef(null);
    const minStokSeviyesiRef = useRef(null);
    const maxStokSeviyesiRef = useRef(null);
    const siparisSuresiRef = useRef(null);
    const detayTakipRef = useRef(null);
    const anaGrupRef = useRef(null);
    const altGrupRef = useRef(null);
    const yerliYabanciRef = useRef(null);
    const menseiRef = useRef(null);
    const notRef = useRef(null);

    const refs = [
        stokKoduRef,
        stokAdiRef,
        yerKoduRef,
        tedarikciRef,
        stokKisaIsimRef,
        stokYabanciIsimRef,
        stokCinsiRef,
        stokBirimAdiRef,
        toptanVergiRef,
        perakendeVergiRef,
        minStokSeviyesiRef,
        maxStokSeviyesiRef,
        siparisSuresiRef,
        detayTakipRef,
        anaGrupRef,
        altGrupRef,
        yerliYabanciRef,
        menseiRef,
        notRef
    ];

    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleChange = (file) => {
        setFile(file);
        console.log(file)
    };

    const resetError = (name) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (name) {
                delete newErrors[name];
                setErrors(newErrors);
            }
        });
    }

    const handleOnChange = (e) => {
        const key = e.target.name;

        if (errors?.hasOwnProperty(key) && typeof errors[key] === "string") {
            resetError(key);
        }
    }

    const validateForm = (refs) => {

        const errors = refs.reduce((acc, ref) => {
            if (!ref.current.value) {
                acc[ref.current.name] = 'zorunlu alan';
            }
            return acc;
        }, {});

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return false;
        }

        return true
    }

    const generateCode = () => {
        stokKoduRef.current.value = Math.random().toString(36).substr(2, 6);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            stokKodu: stokKoduRef.current.value,
            stokAdi: stokAdiRef.current.value,
            yerKodu: yerKoduRef.current.value,
            tedarikci: tedarikciRef.current.value,
            stokKisaIsim: stokKisaIsimRef.current.value,
            stokYabanciIsim: stokYabanciIsimRef.current.value,
            stokCinsi: stokCinsiRef.current.value,
            stokBirimAdi: stokBirimAdiRef.current.value,
            toptanVergi: toptanVergiRef.current.value,
            perakendeVergi: perakendeVergiRef.current.value,
            minStokSeviyesi: minStokSeviyesiRef.current.value,
            maxStokSeviyesi: maxStokSeviyesiRef.current.value,
            siparisSuresi: siparisSuresiRef.current.value,
            detayTakip: detayTakipRef.current.value,
            anaGrup: anaGrupRef.current.value,
            altGrup: altGrupRef.current.value,
            yerliYabanci: yerliYabanciRef.current.value,
            mensei: menseiRef.current.value,
            not: notRef.current.value,
        };

        if (!validateForm(refs)) {
            return;
        }

    }
    return (
        <Box p={5}>
            <Heading>Stok Tanitim karti detail</Heading>
            <br></br>
            <Grid templateColumns='2fr 1fr'>
                <GridItem p={5} >
                    <Flex direction={'column'} gap={3}>
                        <Flex gap={3}>
                            <Flex w={'50%'} gap={1} direction={'row'} align={'center'}>
                                <Box>
                                    <Text fontSize={"sm"} >{"Stok Kodu"}</Text>
                                    <Flex gap={3}>
                                        <Input onChange={e => handleOnChange(e)} isInvalid={errors?.stokKodu} name={"stokKodu"} size={'sm'} w={'100%'} ref={stokKoduRef} />
                                        <Button onClick={generateCode} w={'25%'} size={'sm'}><BiLeftArrow /> Yeni kod</Button>
                                    </Flex>

                                    {<Text color={'tomato'} fontSize='xs'>{errors?.stokKodu}</Text>}
                                </Box>

                            </Flex>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Stok Adı"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.stokAdi} name={"stokAdi"} size={'sm'} w={'100%'} ref={stokAdiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.stokAdi}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Yer Kodu"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.yerKodu} name={"yerKodu"} size={'sm'} w={'100%'} ref={yerKoduRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.yerKodu}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Tedarikçi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.tedarikci} name={"tedarikci"} size={'sm'} w={'100%'} ref={tedarikciRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.tedarikci}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Stok Kısa İsmi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.stokKisaIsmi} name={"stokKisaIsmi"} size={'sm'} w={'100%'} ref={stokKisaIsimRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.stokKisaIsmi}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Stok Yabancı İsmi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.stokYabanciIsmi} name={"stokYabanciIsmi"} size={'sm'} w={'100%'} ref={stokYabanciIsimRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.stokYabanciIsmi}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Stok Cinsi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.stokCinsi} name={"stokCinsi"} size={'sm'} w={'100%'} ref={stokCinsiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.stokCinsi}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Stok Birim Adı"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.stokBirimAdi} name={"stokBirimAdi"} size={'sm'} w={'100%'} ref={stokBirimAdiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.stokBirimAdi}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Toptan Vergi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.toptanVergi} name={"toptanVergi"} size={'sm'} w={'100%'} ref={toptanVergiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.toptanVergi}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Perakende Vergi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.perakendeVergi} name={"perakendeVergi"} size={'sm'} w={'100%'} ref={perakendeVergiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.perakendeVergi}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Minimum Stok Seviyesi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.minStokSeviyesi} name={"minStokSeviyesi"} size={'sm'} w={'100%'} ref={minStokSeviyesiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.minStokSeviyesi}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Maksimum Stok Seviyesi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.maxStokSeviyesi} name={"maxStokSeviyesi"} size={'sm'} w={'100%'} ref={maxStokSeviyesiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.maxStokSeviyesi}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Sipariş Süresi"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.siparisSuresi} name={"siparisSuresi"} size={'sm'} w={'100%'} ref={siparisSuresiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.siparisSuresi}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Detay Takip"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.detayTakip} name={"detayTakip"} size={'sm'} w={'100%'} ref={detayTakipRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.detayTakip}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Ana Grup"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.anaGrup} name={"anaGrup"} size={'sm'} w={'100%'} ref={anaGrupRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.anaGrup}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Alt Grup"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.altGrup} name={"altGrup"} size={'sm'} w={'100%'} ref={altGrupRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.altGrup}</Text>}
                            </Box>
                        </Flex>
                        <Flex gap={3}>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Yerli / Yabancı"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.yerliYabanci} name={"yerliYabanci"} size={'sm'} w={'100%'} ref={yerliYabanciRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.yerliYabanci}</Text>}
                            </Box>
                            <Box w={'50%'}>
                                <Text fontSize={"sm"} >{"Menşei"}</Text>
                                <Input onChange={e => handleOnChange(e)} isInvalid={errors?.mensei} name={"mensei"} size={'sm'} w={'100%'} ref={menseiRef} />
                                {<Text color={'tomato'} fontSize='xs'>{errors?.mensei}</Text>}
                            </Box>
                        </Flex>
                        <Flex direction={'column'}>
                            <Text>Not</Text>
                            <Textarea onChange={e => handleOnChange(e)} isInvalid={errors?.not} name={"not"} ref={notRef} placeholder='Here is a sample placeholder' />
                            {<Text color={'tomato'} fontSize='xs'>{errors?.not}</Text>}
                        </Flex>
                    </Flex>
                </GridItem>

                <GridItem p={5}>
                    <Box boxSize='sm'>
                        <Image mb={3} src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                        <Button onClick={onOpen}>Fotoğraf işlemleri</Button>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </GridItem>
            </Grid>

        </Box>
    )
}

export default StokTanitimKartiDetail