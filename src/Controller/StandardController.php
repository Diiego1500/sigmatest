<?php

namespace App\Controller;

use App\Entity\Contacts;
use App\Form\ContactsType;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StandardController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(Request $request)
    {

        $form_contact = $this->createForm(ContactsType::class);
        $form_contact->handleRequest($request);
        return $this->render('standard/index.html.twig',[
            'form_contact'=>$form_contact->createView()
        ]);
    }

    /**
     * @Route("/contacts/", options={"expose"=true}, name="contacts")
     */
    public function contacts(Request $request, PaginatorInterface $paginator){
        $em = $this->getDoctrine()->getManager();
        $query = $em->getRepository(Contacts::class)->findAllContacts();
        $pagination = $paginator->paginate(
            $query, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            5 /*limit per page*/
        );
        return $this->render('standard/contacts.html.twig',['pagination'=>$pagination]);
    }

    /**
     * @Route("ajax/save_contact/", options={"expose"=true}, name="save_contact")
     */
    public function save_contact(Request $request){
        if($request->isXmlHttpRequest()){
            $em = $this->getDoctrine()->getManager();
            $name = $request->request->get('name');
            $email = $request->request->get('email');
            $state = $request->request->get('state');
            $city = $request->request->get('city');
            $contact = new Contacts($name,$email,$state,$city);
            $em->persist($contact);
            $em->flush();
            return new JsonResponse(['success'=>true]);
        }else{
            throw new \Exception('This is not an ajax call');
        }
    }
}
